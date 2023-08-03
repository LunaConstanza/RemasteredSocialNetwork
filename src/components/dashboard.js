import { auth, closeSesion, currentChange } from "../lib/auth.js";
import { dataPost, savePost, dataUser, deletePost, editPost, updateLikes } from "../lib/store.js";
import { headerLogo } from "./h&f.js";

const dashboard = (navigateTo) => {

    currentChange(navigateTo);

    const containerDashboard = document.createElement('main');
    containerDashboard.setAttribute('id', 'mainDash');
    containerDashboard.classList.add('mainDash');

    // ------- PERFIL-----------
    const profile = document.createElement('div');
    profile.classList.add('mainDash_profile');
    const user = document.createElement('h4');
    user.setAttribute('id', 'dataUser');
    console.log(auth.currentUser);
    if (auth.currentUser === null) {
        dataUser().then(displayName => {
            user.innerHTML = `<span class="h4bold">Hola!</span> ${displayName}`;
    
        })
    } else {
        user.innerHTML = `<span class="h4bold">Hola!</span> ${auth.currentUser.displayName}`;
    }

    const btnLogOut = document.createElement('button');
    btnLogOut.setAttribute('id', 'btnLogOut');
    btnLogOut.classList.add('btnLogOut');
    btnLogOut.innerHTML = `Cerrar sesión <i class="fa-solid fa-right-from-bracket"></i>`;

    // -----------PUBLICACIONES Y CREAR POST --------------
    const board = document.createElement('div');
    board.classList.add('mainDash_board');

    // ------ CREAR POST ---------
    const createPost = document.createElement('div');
    createPost.classList.add('mainDash_board_createPost');
    const titleCreatePost = document.createElement('h5');
    titleCreatePost.classList.add('mainDash_board_createPost_title');
    titleCreatePost.innerHTML = `¿Qué vas a jugar hoy ?`;

    const formCreatePost = document.createElement('form');
    formCreatePost.classList.add('mainDash_board_createPost_form');
    formCreatePost.setAttribute('id', 'text-form');

    const inputCreatePost = document.createElement('textarea');
    inputCreatePost.classList.add('mainDash_board_createPost_textarea');
    inputCreatePost.setAttribute('placeholder', 'Escribe aquí...');
    inputCreatePost.setAttribute('maxLength', '500');
    inputCreatePost.setAttribute('required', '');
    inputCreatePost.setAttribute('id', 'text-description');

    const submitPost = document.createElement('button');
    submitPost.setAttribute('type', 'submit');
    submitPost.classList.add('mainDash_board_createPost_submit');
    submitPost.innerHTML = `Publicar`;

    // ------------- PUBLICACIONES -----------
    const publications = document.createElement('div');
    publications.classList.add('mainDash_board_publications');
    const topBar = document.createElement('div');
    topBar.classList.add('mainDash_board_publications_topbar');
    const titlePublications = document.createElement('h5');
    titlePublications.classList.add('mainDash_board_publications_topbar_title')
    titlePublications.innerHTML = `<i class="fa-solid fa-bomb"></i> Publicaciones`;
    const btnRefresh = document.createElement('button');
    btnRefresh.classList.add('mainDash_board_publications_topbar_refresh');
    btnRefresh.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`
    const scrollContent = document.createElement('div');
    scrollContent.classList.add('mainDash_board_publications_scroll');
    scrollContent.setAttribute('id', 'container_posts');

    // ------- APPENDCHILD -------------
    containerDashboard.append(headerLogo(), profile, board);
    profile.append(user, btnLogOut);
    board.append(createPost, publications);
    createPost.append(titleCreatePost, formCreatePost);
    formCreatePost.append(inputCreatePost, submitPost);
    publications.append(topBar, scrollContent);
    topBar.append(titlePublications, btnRefresh);

    const postDisplay = () => {
        let html = '';
        dataPost().then(res => {
            res.forEach(doc => {
                const post = doc.data();
                html += `
                    <div class="mainDash_board_publications_content">
                        <div class="mainDash_board_publications_content_user">
                            <h6>${post.name} publicó:</h6>`;
    
                if (post.uid === auth.currentUser.uid) {
                    html += `
                            <div class="mainDash_board_publications_content_user_btns">
                                <button type="button" class="btnEdit" value="${doc.id}"><i class="fa-solid fa-pen-to-square"></i></button>
                                <button type="button" class="btnDelete" value="${doc.id}"><i class="fa-solid fa-trash"></i></button>
                            </div>
                        </div>
                        <p id="${doc.id}" class="mainDash_board_publications_content_text">${post.description}</p>
                        <div class="mainDash_board_publications_content_star">
                            <button class="btn-like mainDash_board_publications_content_starR" value="${doc.id}"><i class="fa-regular fa-star"></i></button>
                            <p>${post.likesCounter} Likes</p>
                        </div>
                    </div>`;
                } else {
                    html += `
                        </div>
                        <p id="${doc.id}" class="mainDash_board_publications_content_text">${post.description}</p>
                        <div class="mainDash_board_publications_content_star">
                            <button class="btn-like mainDash_board_publications_content_starR" value="${doc.id}"><i class="fa-regular fa-star"></i></button>
                            <p>${post.likesCounter} Likes</p>
                        </div>
                    </div>`;
                }

            });
            scrollContent.innerHTML = html;
                
            const btnsEdit = document.querySelectorAll('.btnEdit');
            const edits = document.querySelectorAll('.mainDash_board_publications_content_text');
            const btnDelete = document.querySelectorAll('.btnDelete');
            const likeBtn = document.querySelectorAll('.btn-like');
            
            btnsEdit.forEach(btn => {
                btn.addEventListener('click', () => {
                    edits.forEach(post => {
                        if(post.id === btn.value){
                            const input = document.createElement('textarea')
                            input.classList.add('mainDash_board_publications_content_text_edit')
                            input.value = post.textContent;
                            btn.innerHTML = '<i class="fa-solid fa-check"></i>';
                            post.innerHTML = '';
                            post.append(input);

                            btnDelete.forEach((btnD) => {
                                if (btn.value === btnD.value) {
                                    // btnD.classList.remove('btnDelete');
                                    // btnD.classList.add('btnCancel')
                                    // btnD.innerHTML = '<i class="fa-solid fa-xmark">';
                                    btnD.innerHTML = '';
                                }
                                btnD.addEventListener('click', () => {
                                    postDisplay();
                                })
                            });



                            btn.addEventListener('click', () => {
                                editPost(btn.value, input.value).then(() => postDisplay());
                            })

                        }
                    });
                })
                
            })

            btnDelete.forEach((btn) => {
                btn.addEventListener('click', () => {
                    console.log('click');
                    if (confirm("¿Estás segura de eliminar esta publicación?")) {
                        deletePost(btn.value).then(() => postDisplay());
                    }
                });
            });

            //DARLE O QUITARLE LIKE
            likeBtn.forEach((btnL) => {
                btnL.addEventListener('click', () => {
                    console.log('click like');
                    const alerta = (valid) => {
                        if (valid) {
                            btnL.innerHTML = '';
                            btnL.innerHTML = '<i class="fa-solid fa-star"></i>'
                            postDisplay()
                        } else {
                            btnL.innerHTML = '';
                            btnL.innerHTML = '<i class="fa-regular fa-star"></i>'
                            postDisplay()
                        }
                    }
                    updateLikes(btnL.value, alerta);
                    postDisplay();
              });
            });

        });
    };
    postDisplay();
    
    // ----- PUBLICAR POST -----------
    formCreatePost.addEventListener('submit', (e) => {
        e.preventDefault();
        const post = inputCreatePost.value;
        savePost(post);
        formCreatePost.reset();
        postDisplay();
    });    

    // ----- REFRESCAR POST -----------
    btnRefresh.addEventListener('click', () => {
        postDisplay();
    });

    // ----- CERRAR SESIÓN -----------
    btnLogOut.addEventListener('click', () => {
        closeSesion(navigateTo);
    });

    return containerDashboard;
}

export default dashboard;