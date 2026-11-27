const botaoMenu = document.querySelector("#abrir-menu");
const menu = document.querySelector("#menu");

botaoMenu.addEventListener("click", function () {
    menu.showModal();
});

// Um toque fora do painel também fecha o menu.
menu.addEventListener("click", function (evento) {
    if (evento.target !== menu) {
        return;
    }

    const painel = menu.getBoundingClientRect();
    if (evento.clientX < painel.left || evento.clientX >= painel.right) {
        menu.close();
    }
});
