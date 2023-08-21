import imgLogo from "../img/logo.png"

export const headerLogo = () => {
    const header = document.createElement("header");
    const logo = document.createElement("img");
    logo.classList.add("logoRS");
    logo.setAttribute("width", "200px");
    logo.setAttribute("src", imgLogo);
    logo.setAttribute("alt", "Logo red social");
  
    header.appendChild(logo);
  
    return header;
  };