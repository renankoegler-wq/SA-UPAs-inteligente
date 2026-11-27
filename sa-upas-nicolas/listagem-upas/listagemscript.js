
const cidade = document.getElementById("cidade");
const unidadesDisponiveis = document.getElementById("unidades-disponiveis");
const listaDisponiveis = document.getElementById("lista-disponiveis");

const nomeUpa = document.getElementById("nome-upa");
const imagemUpa = document.getElementById("imagem-upa");
const informacaoUpa = document.getElementById("informacao-upa");

const adicionarUpa = document.getElementById("adicionar-upa");
const listaUpas = document.getElementById("lista-upas");
const mensagem = document.getElementById("mensagem");

const abrirMenu = document.getElementById("abrir-menu");
const menu = document.getElementById("menu");

const upas = [
    {
        nome: "PA Norte",
        cidade: "joinville",
        bairro: "Costa e Silva",
        endereco: "Rua Guilherme, 640",
        funcionamento: "24 horas",
        imagem: "imagens/pa-norte.jpg"
    },
    {
        nome: "UPA Leste",
        cidade: "joinville",
        bairro: "Aventureiro",
        endereco: "Rua Mafalda Laurindo, 262",
        funcionamento: "24 horas",
        imagem: "imagens/upa-leste.jpg"
    },
    {
        nome: "UPA Sul",
        cidade: "joinville",
        bairro: "João Costa",
        endereco: "Rua Monsenhor Gercino, s/n",
        funcionamento: "24 horas",
        imagem: "imagens/upa-sul.jpg"
    }
];

let upaSelecionada = null;
let upasSalvas = [];

try {
    const dados = JSON.parse(
        localStorage.getItem("upasSalvasJoinville")
    ) || [];

    upasSalvas = upas.filter(function (upa) {
        return dados.some(function (salva) {
            return salva.nome === upa.nome;
        });
    });

} catch {
    upasSalvas = [];
}

function mostrarUnidades() {

    listaDisponiveis.innerHTML = "";

    upaSelecionada = null;

    nomeUpa.textContent = "UPA selecionada";
    informacaoUpa.textContent = "Selecione uma unidade para visualizar suas informações.";
    imagemUpa.src = "imagens/upa.jpg";
    imagemUpa.alt = "Imagem ilustrativa de uma unidade de pronto atendimento";

    mensagem.textContent = "";

    atualizarBotao();
    destacarSelecionada();

    if (cidade.value === "") {
        unidadesDisponiveis.hidden = true;
        return;
    }

    unidadesDisponiveis.hidden = false;

    const resultado = upas.filter(function (upa) {
        return upa.cidade === cidade.value;
    });

    resultado.forEach(function (upa) {

        const item = document.createElement("li");
        const botao = document.createElement("button");
        const detalhes = document.createElement("span");

        botao.type = "button";
        botao.className = "selecionar-upa";
        botao.textContent = upa.nome;
        botao.dataset.upa = upa.nome;

        botao.setAttribute("aria-pressed", "false");
        botao.setAttribute("aria-controls", "detalhes-upa");
        botao.setAttribute("aria-label", "Visualizar " + upa.nome);

        detalhes.textContent = upa.bairro + " | Atendimento 24 horas";

        botao.appendChild(detalhes);

        botao.addEventListener("click", function () {
            selecionarUpa(upa);
        });

        item.appendChild(botao);
        listaDisponiveis.appendChild(item);

    });
}

function selecionarUpa(upa) {

    upaSelecionada = upa;

    nomeUpa.textContent = upa.nome;
    imagemUpa.src = upa.imagem;
    imagemUpa.alt = "Fachada da unidade " + upa.nome;

    informacaoUpa.innerHTML = `
        <strong>Bairro:</strong> ${upa.bairro}<br>
        <strong>Endereço:</strong> ${upa.endereco}<br>
        <strong>Cidade:</strong> Joinville - SC<br>
        <strong>Funcionamento:</strong> ${upa.funcionamento}
    `;

    mensagem.textContent = "Exibindo informações de " + upa.nome + ".";

    atualizarBotao();
    destacarSelecionada();
}

function destacarSelecionada() {

    const botoes = document.querySelectorAll("[data-upa]");

    botoes.forEach(function (botao) {

        const selecionado = upaSelecionada !== null &&
            botao.dataset.upa === upaSelecionada.nome;

        botao.classList.toggle("selecionada", selecionado);

        botao.setAttribute("aria-pressed", String(selecionado));

    });
}

function atualizarBotao() {

    if (upaSelecionada === null) {
        adicionarUpa.disabled = true;
        adicionarUpa.textContent = "Adicionar UPA";
        return;
    }

    const existe = upasSalvas.some(function (upa) {
        return upa.nome === upaSelecionada.nome;
    });

    adicionarUpa.disabled = existe;

    if (existe) {
        adicionarUpa.textContent = "UPA adicionada";
    } else {
        adicionarUpa.textContent = "Adicionar UPA";
    }
}

function salvarUpas() {

    try {

        localStorage.setItem(
            "upasSalvasJoinville",
            JSON.stringify(upasSalvas)
        );

        return true;

    } catch {
        return false;
    }
}

function adicionarUnidade() {

    if (upaSelecionada === null) {
        return;
    }

    const existe = upasSalvas.some(function (upa) {
        return upa.nome === upaSelecionada.nome;
    });

    if (existe) {
        return;
    }

    upasSalvas.push(upaSelecionada);

    mostrarSalvas();
    atualizarBotao();

    if (salvarUpas()) {
        mensagem.textContent = upaSelecionada.nome + " adicionada com sucesso.";
    } else {
        mensagem.textContent = "UPA adicionada, mas não foi possível salvá-la no navegador.";
    }
}

function removerUpa(indice) {

    const nome = upasSalvas[indice].nome;

    upasSalvas.splice(indice, 1);

    mostrarSalvas();
    atualizarBotao();

    if (salvarUpas()) {
        mensagem.textContent = nome + " removida da lista.";
    } else {
        mensagem.textContent = "Não foi possível atualizar o armazenamento.";
    }
}

function mostrarSalvas() {

    listaUpas.innerHTML = "";

    if (upasSalvas.length === 0) {

        const item = document.createElement("li");

        item.textContent = "Nenhuma unidade salva.";

        listaUpas.appendChild(item);

        return;
    }

    upasSalvas.forEach(function (upa, indice) {

        const item = document.createElement("li");
        const nome = document.createElement("button");
        const botao = document.createElement("button");

        nome.type = "button";
        nome.className = "visualizar-upa";
        nome.textContent = upa.nome;
        nome.dataset.upa = upa.nome;

        nome.setAttribute("aria-label", "Visualizar informações de " + upa.nome);
        nome.setAttribute("aria-controls", "detalhes-upa");
        nome.setAttribute("aria-pressed", "false");

        nome.addEventListener("click", function () {

            selecionarUpa(upa);

            document.getElementById("detalhes-upa").focus();

            document.getElementById("detalhes-upa").scrollIntoView({
                block: "nearest"
            });

        });

        botao.type = "button";
        botao.className = "remover-upa";
        botao.textContent = "Remover";

        botao.setAttribute("aria-label", "Remover " + upa.nome);

        botao.addEventListener("click", function () {

            removerUpa(indice);

            document.getElementById("titulo-salvas").focus();

        });

        item.appendChild(nome);
        item.appendChild(botao);

        listaUpas.appendChild(item);

    });

    destacarSelecionada();
}

cidade.addEventListener("change", mostrarUnidades);

adicionarUpa.addEventListener("click", adicionarUnidade);

abrirMenu.addEventListener("click", function () {

    menu.showModal();
    abrirMenu.setAttribute("aria-expanded", "true");

});

menu.addEventListener("close", function () {

    abrirMenu.setAttribute("aria-expanded", "false");
    abrirMenu.focus();

});

mostrarUnidades();
mostrarSalvas();
atualizarBotao();
