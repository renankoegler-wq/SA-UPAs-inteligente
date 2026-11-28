const formulario = document.getElementById("form-triagem");
const sintomas = document.getElementById("sintomas");
const conversa = document.getElementById("conversa");
const reiniciar = document.getElementById("reiniciar");
const abrirMenu = document.getElementById("abrir-menu");
const menu = document.getElementById("menu");

const mensagemInicial = conversa.innerHTML;

function adicionarMensagem(texto, tipo) {

    const mensagem = document.createElement("div");
    const nome = document.createElement("strong");
    const paragrafo = document.createElement("p");

    mensagem.classList.add("mensagem", tipo);

    if (tipo === "usuario") {
        nome.textContent = "Você";
    } else {
        nome.textContent = "Assistente virtual";
    }

    paragrafo.textContent = texto;

    mensagem.appendChild(nome);
    mensagem.appendChild(paragrafo);

    conversa.appendChild(mensagem);

    conversa.scrollTop = conversa.scrollHeight;
}

function responder() {

    adicionarMensagem(
        "De acordo com a sua mensagem enviada anteriormente, chegamos a conclusão de que sua prioridade de atendimento é verde (pouco urgente). De preferencia, se encaminhe à uma Unidade de Pronto Atendimento.",
        "assistente"
    );
    
}


function enviarMensagem(evento) {

    evento.preventDefault();

    const texto = sintomas.value.trim();

    if (texto === "") {
        sintomas.focus();
        return;
    }

    adicionarMensagem(texto, "usuario");

    sintomas.value = "";

    responder();

    sintomas.focus();
}

function reiniciarConversa() {

    conversa.innerHTML = mensagemInicial;

    sintomas.value = "";

    sintomas.focus();
}

formulario.addEventListener("submit", enviarMensagem);

reiniciar.addEventListener("click", reiniciarConversa);

abrirMenu.addEventListener("click", function () {

    menu.showModal();

    abrirMenu.setAttribute("aria-expanded", "true");

});

menu.addEventListener("close", function () {

    abrirMenu.setAttribute("aria-expanded", "false");

    abrirMenu.focus();

});