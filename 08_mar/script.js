String.prototype.ucFirst = function() {
    let newStr = '';
    let arrStr = this.trim().split(' ');
    arrStr.forEach((str, i, arrStr) => {
        newStr += str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        if (i != arrStr.length - 1)
            newStr += ' ';
    });
    return newStr;
}

class Pessoa {
    #nome;
    #email;
    #dataNascimento;

    constructor(nome, email, dataNascimento) {
        this.#nome = nome;
        this.#email = email;
        this.#dataNascimento = new Date(dataNascimento + "T00:00");
    }

    get nome() { return this.#nome; }
    set nome(value) { this.#nome = value; }

    get email() { return this.#email; }
    set email(value) { this.#email = value; }

    get dataNascimento() { return this.#dataNascimento; }
    set dataNascimento(value) { this.#dataNascimento = new Date(value + "T00:00"); }
}

class Aluno extends Pessoa {
    #curso;
    #matricula;

    constructor(nome, email, dataNascimento, curso, matricula) {
        super(nome, email, dataNascimento);
        this.#curso = curso;
        this.#matricula = +matricula;
    }

    get curso() { return this.#curso; }
    set curso(value) { this.#curso = value; }

    get matricula() { return this.#matricula; }
    set matricula(value) { this.#matricula = +value; }
}

class Professor extends Pessoa {
    #area;
    #matricula;
    #lattes;

    constructor(nome, email, dataNascimento, area, matricula, lattes) {
        super(nome, email, dataNascimento);
        this.#area = area;
        this.#matricula = +matricula;
        this.#lattes = lattes;
    }

    get area() { return this.#area; }
    set area(value) { this.#area = value; }

    get matricula() { return this.#matricula; }
    set matricula(value) { this.#matricula = +value; }

    get lattes() { return this.#lattes; }
    set lattes(value) { this.#lattes = value; }
}

class Item {
    #descricao;
    #observacao;
    #cidade;
    #dataHora;
    #estaAtivo;

    constructor(descricao, observacao, cidade, dataHora, estaAtivo = false) {
        this.#descricao = descricao;
        this.#observacao = observacao;
        this.#cidade = cidade;
        this.#dataHora = new Date(dataHora);
        this.#estaAtivo = estaAtivo;
    }

    get descricao() { return this.#descricao; }
    set descricao(value) { this.#descricao = value; }

    get observacao() { return this.#observacao; }
    set observacao(value) { this.#observacao = value; }

    get cidade() { return this.#cidade; }
    set cidade(value) { this.#cidade = value; }

    get dataHora() { return this.#dataHora; }
    set dataHora(value) { this.#dataHora = new Date(value); }

    get estaAtivo() { return this.#estaAtivo; }
    set estaAtivo(value) { this.#estaAtivo = value; }
}

class ToDoList {
    #items = [];

    constructor(items) {
        this.#items = items;
    }
}

function initializeToDoList() {
    let serpentsToPush = [
        [
            "Prova de Matemática",
            "Estudar: matrizes; determinantes; sistemas lineares",
            "Presidente Prudente",
            "2023-04-13T19:00"
        ],
        [
            "Prova de PHP",
            "Estudar: conceitos de POO",
            "Presidente Prudente",
            "2023-04-14T21:00"
        ],
        [
            "Prova de Redes",
            "Estudar: TIC domicílios",
            "Presidente Prudente",
            "2023-04-12T19:00"
        ],
        [
            "Prova de Lab. Eng. Software",
            "Estudar: sintaxe e tipos; laços e iterações; controle de fluxo e manipulação de erro; expressões e operadores; funções; coleções indexadas; objetos",
            "Presidente Prudente",
            "2023-04-11T19:00"
        ]
    ];

    let airplane = new Airplane();
    serpentsToPush.forEach((serpent) => {
        const lenSerp = airplane.getAllSerpents().length > 0 ? airplane.getAllSerpents().at(-1).id : 0;
        airplane.setNewSerpent(new Serpent(serpent[0], serpent[1], serpent[2], serpent[3], lenSerp));
    });
    
    airplane.getAllSerpents().forEach((serpent) => {
        console.log("Id: " + serpent.id + "\n" +
        "Nome popular: " + serpent.popularName + "\n" +
        "Nome científico: " + serpent.cientificName + "\n" +
        "Interesse médico: " + (serpent.medicalInterest === true ? "sim" : "não") + "\n" +
        "Família: " + serpent.familyType + "\n");
    });

    firstTimeOnThePlane = true;
}

let aluno = new Aluno("Diogo", "diogo.scarmagnani@fatec.sp.gov.br", "1990-04-14", "Análise e Desenvolvimento de Sistemas", "15701632598");
console.log(aluno.curso);
console.log(aluno);

function rodarQuandoCarregar() {
    const urlAtual = new URL(location.href);
    
    if (urlAtual.searchParams.get("rodar"))
        return;

    location.href = "../index.html";
}

function esquece() {
    console.log("Esqueeeece...");
}

document.querySelector("#form-todo-list").addEventListener("submit", esquece);
document.querySelector("#form-todo-list").addEventListener("reset", esquece);
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);