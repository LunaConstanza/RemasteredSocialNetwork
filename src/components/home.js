import { login, registerGoogle, resetPass } from "../lib/auth.js";
import { headerLogo} from "./h&f.js";

const home = (navigateTo) => {

    const containerLogin = document.createElement("main");
    containerLogin.classList.add("mainLogin");
    const subTitleLogin = document.createElement("h2");
    subTitleLogin.innerHTML = `Inicio de Sesión`;
    const formLogin = document.createElement("form");
    formLogin.classList.add("formLogin");

    const userLogin = document.createElement("input");
    userLogin.setAttribute("type", "email");
    userLogin.setAttribute("id", "emailLogin");
    userLogin.setAttribute("placeholder", "Ingresa tu correo electrónico");
    userLogin.setAttribute("size", "25");
    userLogin.setAttribute("maxlength", "40");
    userLogin.setAttribute("required", "");

    const passwordLogin = document.createElement("input");
    passwordLogin.setAttribute("type", "password");
    passwordLogin.setAttribute("id", "passwordLogin");
    passwordLogin.setAttribute("placeholder", "Ingresa tu contraseña");
    passwordLogin.setAttribute("minlength", "6");
    passwordLogin.setAttribute("maxlength", "12");
    passwordLogin.setAttribute("required", "");

    const btnLogIn = document.createElement("button");
    btnLogIn.setAttribute("type", "submit");
    btnLogIn.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Iniciar Sesión`;

    const textReset = document.createElement("p");
    textReset.innerHTML = `¿Olvidaste tu contraseña? <a href="#">Recupérala</a>`;

    /*************POP UP***********/
    let divOverlay = document.createElement("div");
    divOverlay.classList.add("overlay");
    divOverlay.setAttribute("id", "overlay");
    let divPopup = document.createElement("div");
    divPopup.classList.add("popup");
    divPopup.setAttribute("id", "popup");
    const btnClose = document.createElement("i");
    btnClose.classList.add("fa-solid");
    btnClose.classList.add("fa-xmark");
    const h3Popup = document.createElement("h3");
    h3Popup.innerHTML = `No hay problema ¡nosotras te ayudamos!`;
    const textPopup = document.createElement("p");
    textPopup.innerHTML = `Enviaremos a tu email un correo para que recuperes tu contraseña.`;
    const formResetPass = document.createElement("form");
    const inputEmail = document.createElement("input");
    inputEmail.setAttribute("id", "userEmail");
    inputEmail.setAttribute("type", "email");
    inputEmail.setAttribute("placeholder", "Ingresa aquí tu correo electrónico");
    inputEmail.setAttribute("size", "30");
    inputEmail.setAttribute("maxlength", "40");
    inputEmail.setAttribute("required", "");
    const resetPassword = document.createElement("button");
    resetPassword.classList.add("btnResetPassword");
    resetPassword.innerHTML = `<i class="fa-solid fa-key"></i> Recuperar Contraseña`;

    const btnGoogle = document.createElement("button");
    btnGoogle.classList.add("btnGoogle");
    btnGoogle.innerHTML = `<i class="fa-brands fa-google"></i> Iniciar sesión con Google`;

    const linkRegister = document.createElement("p");
    linkRegister.innerHTML = `¿No tienes cuenta? `;
    const aLinkRegister = document.createElement("a");
    aLinkRegister.setAttribute("id", "linkReg")
    aLinkRegister.innerHTML = `Regístrate`

    containerLogin.append(headerLogo(), subTitleLogin, formLogin);
    formLogin.append(userLogin, passwordLogin, btnLogIn, textReset, divOverlay);
    divOverlay.appendChild(divPopup);
    divPopup.append(btnClose, h3Popup, textPopup, formResetPass);
    formResetPass.append(inputEmail, resetPassword);
    formLogin.append(btnGoogle, linkRegister);
    linkRegister.appendChild(aLinkRegister);

    aLinkRegister.addEventListener("click", ()=> {
        navigateTo('/register')
    });

    /*Hacer login para entrar al muro*/
    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("emailLogin").value;
        const password = document.getElementById("passwordLogin").value;
        const alertaLogin = (valid) => {
            if (valid) {
                navigateTo('/dashboard');
            }
        };
        login(email, password, alertaLogin);
    });

    /*Abrir y cerrar popup*/
    textReset.addEventListener("click", (e) => {
        e.preventDefault();
        divOverlay.classList.add("active");
        divPopup.classList.add("active");
    });
    btnClose.addEventListener("click", (e) => {
        e.preventDefault();
        divOverlay.classList.remove("active");
        divPopup.classList.remove("active");
    });
    formResetPass.addEventListener("submit", (e) => {
        e.preventDefault();
        divOverlay.classList.remove("active");
        divPopup.classList.remove("active");
        const saveEmail = inputEmail.value;
        resetPass(saveEmail);
    });

    /*Botón para ingresar con google*/
    btnGoogle.addEventListener("click", (e) => {
        e.preventDefault();
        const trueUser = (valid) => {
            if (valid) {
                navigateTo('/dashboard');
            }
        }
        registerGoogle(trueUser);
    });

    return containerLogin;

}

export default home;