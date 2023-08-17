import {auth} from "../lib/index.js"
import { closeSesion, currentChange } from "../lib/auth.js";
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
    // console.log(dataUser());
    dataUser().then(displayName => {
        user.innerHTML = `<span class="h4bold">Hola!</span> ${displayName}`;
    })

    const btnLogOut = document.createElement('button');
    btnLogOut.setAttribute('id', 'btnLogOut');
    btnLogOut.classList.add('btnLogOut');
    btnLogOut.innerHTML = `Cerrar sesión <i class="fa-solid fa-right-from-bracket"></i>`;

    // -----------PUBLICACIONES Y CREAR POST --------------
    const board = document.createElement('div');
    board.classList.add('mainDash_board');

    // ------ CREAR POST ---------
    let divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay");
    divOverlay.setAttribute("id", "overlay");

    const createPost = document.createElement('div');
    createPost.classList.add('mainDash_board_createPost');

    const btnClose = document.createElement("i");
    btnClose.classList.add("fa-solid");
    btnClose.classList.add("fa-xmark");

    const titleCreatePost = document.createElement('h5');
    titleCreatePost.classList.add('mainDash_board_createPost_title');
    titleCreatePost.innerHTML = `¿Qué vas a jugar hoy ?`;

    const formCreatePost = document.createElement('form');
    formCreatePost.classList.add('mainDash_board_createPost_form');
    formCreatePost.setAttribute('id', 'text-form');

    const inputCreatePost = document.createElement('textarea');
    inputCreatePost.classList.add('mainDash_board_createPost_textarea');
    inputCreatePost.setAttribute('placeholder', 'Escribe aquí...');
    inputCreatePost.setAttribute('maxLength', '1000');
    inputCreatePost.setAttribute('required', '');
    inputCreatePost.setAttribute('autofocus', '');
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
    const btnPlus = document.createElement('button');
    btnPlus.classList.add('mainDash_board_publications_topbar_plus');
    btnPlus.innerHTML = `Publicar <i class="fa-solid fa-plus"></i>`
    const btnRefresh = document.createElement('button');
    btnRefresh.classList.add('mainDash_board_publications_topbar_refresh');
    btnRefresh.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`
    const scrollContent = document.createElement('div');
    scrollContent.classList.add('mainDash_board_publications_scroll');
    scrollContent.setAttribute('id', 'container_posts');

    // ------- APPENDCHILD -------------
    containerDashboard.append(headerLogo(), profile, board);
    profile.append(user, btnLogOut);
    board.append(divOverlay, publications);
    divOverlay.appendChild(createPost)
    createPost.append(btnClose, titleCreatePost, formCreatePost);
    formCreatePost.append(inputCreatePost, submitPost);
    publications.append(topBar, scrollContent);
    topBar.append(titlePublications, btnPlus, btnRefresh);

    const postDisplay = () => {
        let html = '';
        dataPost().then(res => {
            res.forEach(doc => {
                const post = doc.data();
                const date = post.datepost.toDate().toString().slice(0,21)
                const country = post.datepost.toDate().toString().slice(52, -1);
                
                const likes = (uid) => {
                    if(post.likes.includes(uid)){
                        // console.log('le di like');
                        return '<i class="fa-solid fa-star"></i>'
                    } else {
                        // console.log('no le di like');
                        return '<i class="fa-regular fa-star"></i>'
                    }
                }

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
                            <div class="mainDash_board_publications_content_starDiv">
                                <button class="btn-like mainDash_board_publications_content_starR" value="${doc.id}">${likes(auth.currentUser.uid)}</button>
                                <p>${post.likesCounter} Likes</p>
                            </div>
                            <p for="date">${date}hrs ${country}</p>
                        </div>
                    </div>`;
                } else {
                    html += `
                        </div>
                        <p id="${doc.id}" class="mainDash_board_publications_content_text">${post.description}</p>
                        <div class="mainDash_board_publications_content_star">
                            <div class="mainDash_board_publications_content_starDiv">
                                <button class="btn-like mainDash_board_publications_content_starR" value="${doc.id}">${likes(auth.currentUser.uid)}</button>
                                <p>${post.likesCounter} Likes</p>
                            </div>
                            <p for="date">${date}hrs ${country}</p>
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
                                    btnD.classList.remove('btnDelete');
                                    btnD.classList.add('btnCancel');
                                    btnD.innerHTML = '<i class="fa-solid fa-xmark"></i>';
                                    // btnD.innerHTML = '';

                                    const btnCancel = document.querySelector('.btnCancel');
                                    btnCancel.addEventListener('click', () => {
                                        console.log('este click');
                                        postDisplay();
                                    })
                                }

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
                    updateLikes(btnL.value);
                    postDisplay();
              });
            });

        });
    };
    postDisplay();
    
    // ----- Abrir modal para publicar ------
    btnPlus.addEventListener('click', () => {
        inputCreatePost.focus();
        divOverlay.classList.add("active");
        createPost.classList.add("active");
    })

    // ----- PUBLICAR POST -----------
    formCreatePost.addEventListener('submit', (e) => {
        e.preventDefault();
        const post = inputCreatePost.value;
        savePost(post);
        formCreatePost.reset();
        divOverlay.classList.remove("active");
        createPost.classList.remove("active");
        postDisplay();
    });
    
    // Cerrar modal
    btnClose.addEventListener("click", () => {
        divOverlay.classList.remove("active");
        createPost.classList.remove("active");
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