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

class ToDoList {
    #descricao;
    #endereco;
    #cidade;
    #dataHora;
    #ativo;

    constructor(descricao, endereco, cidade, dataHora, ativo = false) {
        this.#descricao = descricao;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#dataHora = new Date(dataHora);
        this.#ativo = ativo;
    }

    get descricao() { return this.#descricao; }
    set descricao(value) { this.#descricao = value; }

    get endereco() { return this.#endereco; }
    set endereco(value) { this.#endereco = value; }

    get cidade() { return this.#cidade; }
    set cidade(value) { this.#cidade = value; }

    get dataHora() { return this.#dataHora; }
    set dataHora(value) { this.#dataHora = new Date(value); }

    get ativo() { return this.#ativo; }
    set ativo(value) { this.#ativo = value; }
}

let aluno = new Aluno("Diogo", "diogo.scarmagnani@fatec.sp.gov.br", "1990-04-14", "Análise e Desenvolvimento de Sistemas", "15701632598");
console.log(aluno.curso);

document.addEventListener("DOMContentLoaded", () => location.href = "../index.html");