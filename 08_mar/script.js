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
}

class Aluno {
    #curso;
    #matricula;

    constructor(nome, email, dataNascimento, curso, matricula) {
        super(nome, email, dataNascimento);
        this.#curso = curso;
        this.#matricula = matricula;
    }
}

class Professor {
    #area;
    #matricula;
    #lattes;

    constructor(nome, email, dataNascimento, area, matricula, lattes) {
        super(nome, email, dataNascimento);
        this.#area = area;
        this.#matricula = matricula;
        this.#lattes = lattes;
    }
}

class ToDoList {
    #descricao;
    #endereco;
    #cidade;
    #dataHora;
    #ativo;

    constructor(descricao, endereco, cidade, data, hora, ativo = false) {
        this.#descricao = descricao;
        this.#endereco = endereco;
        this.#cidade = cidade;
        this.#dataHora = new Date(data + hora);
        this.#ativo = ativo;
    }
}

document.addEventListener("DOMContentLoaded", () => location.href = "../index.html");