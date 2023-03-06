function verificarTipo(dado) {
    try {
        let parsed = JSON.parse(dado.toLowerCase());
        return typeof parsed;
    } catch (e) {
        console.log(e);
        return typeof dado;
    }
}

function alertTipoDado() {
    let dado = prompt("Escreva alguma coisa:", '');
    let divEscrever = document.querySelector("#escrever");
    
    if (confirm("Deseja verificar o tipo de dado digitado?")) {
        let typeOf = verificarTipo(dado);
        let text = `O dado digitado <em>${dado}</em> corresponde ao tipo <strong>${typeOf.toUpperCase()}</strong>.`;
        divEscrever.insertAdjacentHTML("beforeend", `<p> ${text} </p>`);
        return;
    }
    
    let text = "Obrigado por visitar esta página.";
    divEscrever.insertAdjacentHTML("beforeend", `<p> ${text} </p>`);
}

function numeroPrimo (num) {
    if (num < 1)
        return false;
    
    if (num == 1)
        return true;
    
    var aux = 0;
    for (let i = num; i >= 1; i--) {
        let resto = num % i;
        
        if (resto == 0)
            aux++;
        
        if (aux > 2)
            return false;
    }

    return true;
}

function alertNumeroPrimo() {
    let numeroInteiro1 = prompt("Digite um número inteiro positivo:", '');
    let ehNumeroPrimo = numeroPrimo(numeroInteiro1);

    if (ehNumeroPrimo === true) {
        alert("O número " + numeroInteiro1 + " é primo.");
        return;
    }
    
    alert("O número " + numeroInteiro1 + " não é primo.");
}

function alertParImpar() {
    let numeroInteiro2 = prompt("Digite um número inteiro positivo:", '');
    let ehPar = +numeroInteiro2 % 2 == 0 ? true : false;

    if (ehPar === true) {
        alert("O número " + numeroInteiro2 + " é par.");
        return;
    }
    
    alert("O número " + numeroInteiro2 + " é ímpar.");
}

function fatorial(num) {
    if (num < 0) 
        return -1;
    
    if (num == 0) 
        return 1;
        
    return num * fatorial(num - 1);
}

function alertFatorial() {
    let numeroInteiro3 = prompt("Digite um número inteiro positivo:", '');
    let numeroFatorial = fatorial(+numeroInteiro3);
    alert("O fatorial do número " + numeroInteiro3 + " é: " + numeroFatorial + ".");
}

// async function rodarQuandoCarregar() {
//     await alertTipoDado();
//     await alertNumeroPrimo();
//     await alertParImpar();
//     await alertFatorial();
// }

function clicarBotao(event) {
    let idClicado = event.target.id;

    switch (idClicado) {
        case "atv-tipo" :
            alertTipoDado();
            break;
        case "atv-primo" :
            alertNumeroPrimo();
            break;
        case "atv-par-impar" :
            alertParImpar();
            break;
        case "atv-fatorial" :
            alertFatorial();
            break;
        default :
            console.log("Errooooou...");
    }
}

document.addEventListener("click", clicarBotao);

document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
// document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);