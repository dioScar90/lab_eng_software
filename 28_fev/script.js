function getValuesDoForm(form) {
    let dados = new FormData(form);
    
    let newObj = {};
    for (const [name, val] of dados) {
        newObj[name] = val;
    }

    return newObj;
}

function reverseString(needle) {
    let splitString = needle.split('');
    let reverseArray = splitString.reverse();
    let stringInvertida = reverseArray.join('');
    return stringInvertida;
}

function verificarPalindromo(e) {
    e.preventDefault();

    let values = getValuesDoForm(e.target);
    let valorLower =
        values.palindromo.trim() // Remove possíveis espaços no início e no fim da string.
            .normalize('NFD') // Normaliza o texto no Formato de Normalização Canônico de Decomposição (acho desnecessário mas ok).
            .replace(/[^\wÀ-ÖØ-öø-ÿ]/g, '') // Remove caracteres especiais, como pontos, traços e até mesmo espaços.
            .replace(/[\u0300-\u036f]/g, '') // Substitui letras acentuadas por letras normais.
            .toLowerCase(); // Deixa todas as letras em caixa baixa.

    let valorParaCompara = reverseString(valorLower);

    let textAlert = valorLower == valorParaCompara ? "É um palíndromo." : "Não é um palíndromo.";

    alert(textAlert);
}

function diaHoje() {
    const spanHoje = document.querySelector("#hoje > span");
    let diasSemana = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Xexta-feira","Sábado"];
    let mesesAno = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

    let hoje = new Date();
    let diaSemana = diasSemana[hoje.getDay()];
    let dia = hoje.getDate() == 1 ? "1º" : hoje.getDate();
    let mes = mesesAno[hoje.getMonth()];
    let ano = hoje.getFullYear();
    let diaCompleto = `${diaSemana}, ${dia} de ${mes} de ${ano}`;

    spanHoje.innerHTML = diaCompleto;
}

function atualizaHora() {
    const agoraLoading = document.querySelector("#agora-loading");
    const agora = document.querySelector("#agora");

    let tempoAgora = new Date().toLocaleTimeString('pt-BR');

    agora.firstElementChild.innerHTML = tempoAgora;
    agoraLoading.classList.add("d-none");
    agora.classList.remove("d-none");
}

const iniciarAtualizaHora = () => setInterval(atualizaHora, 1000);

async function rodarQuandoCarregar() {
    await diaHoje();
    await iniciarAtualizaHora();
}

document.querySelector("#form-palindromo").addEventListener("submit", verificarPalindromo);
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);