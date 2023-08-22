import { registerUser } from "../lib/auth.js";
import { headerLogo } from "./h&f.js";

const register = (navigateTo) => {

    const containerRegister = document.createElement("main");
    containerRegister.setAttribute("id", "mainRegister");
    containerRegister.classList.add("mainRegister");
    const subTitle = document.createElement("h2");
    subTitle.innerHTML = `Registro de Usuario`;
    const formRegister = document.createElement("form");
    formRegister.classList.add("formRegister");

    const inputNameAndLastName = document.createElement("input");
    inputNameAndLastName.setAttribute("id", "nameLastname");
    inputNameAndLastName.setAttribute("type", "text");
    inputNameAndLastName.setAttribute("placeholder", "Nombre y Apellido");
    inputNameAndLastName.setAttribute("pattern", "[A-Za-zÀ-ÿ .]{1,25}");
    inputNameAndLastName.setAttribute("title", "- Solo se pueden ingresar letras. Máx. 25 carácteres.");
    inputNameAndLastName.setAttribute("required", "");

    const inputMail = document.createElement("input");
    inputMail.setAttribute("id", "email");
    inputMail.setAttribute("type", "email");
    inputMail.setAttribute("placeholder", "Correo electrónico");
    inputMail.setAttribute("required", "");

    const inputPassword = document.createElement("input");
    inputPassword.setAttribute("id", "password");
    inputPassword.setAttribute("type", "password");
    inputPassword.setAttribute("placeholder", "Crear contraseña");
    inputPassword.setAttribute("minlength", "6");
    inputPassword.setAttribute("maxlength", "14");
    inputPassword.setAttribute("required", "");

    const labelPhoto = document.createElement("label");
    labelPhoto.setAttribute("for", "photo");
    labelPhoto.innerHTML = `Foto de perfil`;

    const inputPhoto = document.createElement("input");
    inputPhoto.setAttribute("type", "file");
    inputPhoto.setAttribute("id", "photo");
    inputPhoto.classList.add("inputPhoto");
    inputPhoto.setAttribute('accept', 'image/png, image/jpeg');
    inputPhoto.setAttribute("required", "");

    const btnSend = document.createElement("input");
    btnSend.setAttribute("type", "submit");
    btnSend.setAttribute("value", "Regístrate");
    btnSend.classList.add("submitRegister");

    const btnBack = document.createElement('a');
    btnBack.classList.add('btnBack');
    btnBack.innerHTML = `<i class="fa-solid fa-arrow-left"></i> VOLVER`;
    
    containerRegister.append(headerLogo(), subTitle, formRegister);
    formRegister.append(inputNameAndLastName, inputMail, inputPassword, labelPhoto, inputPhoto, btnSend, btnBack);
    
    btnBack.addEventListener("click", () => {
        navigateTo('/')
    })

    formRegister.addEventListener("submit", (e) => {
        e.preventDefault();
        const nameLastname = inputNameAndLastName.value;
        const photo = inputPhoto.files[0];
        const email = inputMail.value;
        const password = inputPassword.value;
    
        registerUser(email, password, nameLastname, photo);
        navigateTo('/');
    });

    return containerRegister;

}

export default register;