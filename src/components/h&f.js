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

// export const footer = () => {
//   const footer = document.createElement('footer');
//   footer.innerHTML = `<p class="textFooter">
//   Copyright© 2022 | Created by
//   <a href="https://github.com/DanielaAlcalaDaboin" target="_blank">Daniela Alcalá</a>,
//   <a href="https://github.com/LizBri" target="_blank">Elizabeth Bringas</a> y <a
//   href="https://github.com/LunaConstanza" target="_blank">Luna González</a>
//   </p>`
//   return footer
// }