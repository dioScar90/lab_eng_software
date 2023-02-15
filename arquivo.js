// alert("Olá, turma!");

// document.write("Escrevendo com JavaScript...");

// let nome = prompt("Escreva seu nome: ", '');
// if (confirm("Quer ver seu nome?"))
//     alert("Seu nome é: " + nome + ".");

// for (let i = 1; i <= 6; i++) {
//     document.write("<h" + i + "> Olá, sala </h" + i + ">");
// }
// document.write("<p> Olá, sala! </p>");

// 1. Implemente um script JavaScript que solicite ao usuário a entrada de um dado via teclado. Em seguida, pergunte se o usuário deseja verificar o tipo do dado informado. Caso o usuário confirme escreva no corpo da página o tipo do dado (Number, String, etc.) caso contrário escreva a mensagem: “Obrigado por visitar esta página”.
let dado = prompt("Escreva alguma coisa: ", '');
if (confirm("Deseja verificar o tipo de dado digitado?")) {
    let typeOf = isNaN(dado) ? typeof dado : typeof parseInt(dado);
    document.write("O dado digitado \"" + dado + "\" corresponde a um(a) " + typeOf + ".");
}
else {
    document.write("Obrigado por visitar esta página.");
}

// 2. Implemente um script JavaScript que solicite ao usuário um número inteiro positivo. Assim que o usuário digitar um valor válido informe em uma janela de alerta se o número é ou não primo.
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
let numeroInteiro1 = prompt("Digite um número inteiro positivo:", '');
let ehNumeroPrimo = numeroPrimo(numeroInteiro1);
if (ehNumeroPrimo === true)
    alert("O número " + numeroInteiro1 + " é primo.");
else
    alert("O número " + numeroInteiro1 + " não é primo.");

// 3. Implemente um script JavaScript que solicite ao usuário um número inteiro positivo. Assim que o usuário digitar um valor válido informe em uma janela de alerta se o número é par ou ímpar.
let numeroInteiro2 = prompt("Digite um número inteiro positivo:", '');
let ehPar = +numeroInteiro2 % 2 == 0 ? true : false;
if (ehPar === true)
    alert("O número " + numeroInteiro2 + " é par.");
else
    alert("O número " + numeroInteiro2 + " é ímpar.");

// 4. Implemente um script JavaScript que solicite ao usuário um número inteiro positivo. Assim que o usuário digitar um valor válido calcule o fatorial do mesmo e exiba o resultado em uma janela de alerta.
function fatorial(num) {
    if (num < 0) 
        return -1;
    else if (num == 0) 
        return 1;
    else
        return (num * fatorial(num - 1));
}
let numeroInteiro3 = prompt("Digite um número inteiro positivo:", '');
let numeroFatorial = fatorial(+numeroInteiro3);
alert("O fatorial do número " + numeroInteiro3 + " é: " + numeroFatorial + ".");