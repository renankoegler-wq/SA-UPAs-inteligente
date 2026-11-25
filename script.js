const botaoMenu = document.querySelector(".menu-desktop");
const sideBar = document.querySelector(".asideBar") 

botaoMenu.addEventListener("click", function () {
    sideBar.classList.toggle("aberta")
})