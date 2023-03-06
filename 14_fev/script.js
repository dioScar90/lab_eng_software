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

function checarNumeroInteiroPositivo(num) {
    let newNum = +num;

    if (isNaN(newNum) || !Number.isInteger(newNum) || newNum < 0 || num.trim() === '')
        return false;
    
    return newNum;
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
    let dadoDigitado = prompt("Digite um número inteiro positivo:", '');
    let numeroInteiro = checarNumeroInteiroPositivo(dadoDigitado);

    if (numeroInteiro === false) {
        alert("Dado digitado não corresponde a um número inteiro positivo.");
        return;
    }

    let ehNumeroPrimo = numeroPrimo(numeroInteiro);

    if (ehNumeroPrimo === true) {
        alert("O número " + numeroInteiro + " é primo.");
        return;
    }
    
    alert("O número " + numeroInteiro + " não é primo.");
}

function alertParImpar() {
    let dadoDigitado = prompt("Digite um número inteiro positivo:", '');
    let numeroInteiro = checarNumeroInteiroPositivo(dadoDigitado);

    if (numeroInteiro === false) {
        alert("Dado digitado não corresponde a um número inteiro positivo.");
        return;
    }

    let ehPar = +numeroInteiro % 2 == 0 ? true : false;

    if (ehPar === true) {
        alert("O número " + numeroInteiro + " é par.");
        return;
    }
    
    alert("O número " + numeroInteiro + " é ímpar.");
}

function fatorial(num) {
    if (num < 0) 
        return -1;
    
    if (num == 0) 
        return 1;
        
    return num * fatorial(num - 1);
}

function alertFatorial() {
    let dadoDigitado = prompt("Digite um número inteiro positivo:", '');
    let numeroInteiro = checarNumeroInteiroPositivo(dadoDigitado);

    if (numeroInteiro === false) {
        alert("Dado digitado não corresponde a um número inteiro positivo.");
        return;
    }

    let numeroFatorial = fatorial(numeroInteiro);
    alert("O fatorial do número " + dadoDigitado + " é: " + numeroFatorial + ".");
}

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