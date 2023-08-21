export const headerLogo = () => {
    const header = document.createElement("header");
    const logo = document.createElement("img");
    logo.classList.add("logoRS");
    logo.setAttribute("width", "200px");
    logo.setAttribute("src", "../img/logo.png");
    logo.setAttribute("alt", "Logo red social");
  
    header.appendChild(logo);
  
    return header;
  };