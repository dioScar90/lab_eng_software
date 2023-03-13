var firstTimeOnToDoList = false;
String.prototype.ucFirst = function(peloMenosPrimeiraPalavra = false) {
    if (peloMenosPrimeiraPalavra === true)
        return this.trim().charAt(0).toUpperCase() + this.trim().slice(1);
    
    let newStr = '';
    let arrStr = this.trim().split(' ');
    arrStr.forEach((str, i, arrStr) => {
        newStr += str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

        if (i != arrStr.length - 1)
            newStr += ' ';
    });
    return newStr;
}

class Utils {
    static getValuesDoForm(form) {
        let dados = new FormData(form);
        
        let newObj = {};
        for (const [name, val] of dados) {
            // newObj[name.replace(/-/g, '_')] = val;
            newObj[name] = val;
        }
    
        return newObj;
    }

    static #compareValues(a, b, asc = false) {
        if (!isNaN(a))
            a = +a;

        if (!isNaN(b))
            b = +b;
    
        if (asc === true)
            return (a < b) ? -1 : (a > b) ? 1 : 0;
        return (a > b) ? -1 : (a < b) ? 1 : 0;
    }

    static sortTableByColumn(thElement) {
        const theadElement = thElement.closest("thead");
        const allTh = theadElement.querySelectorAll("tr > th");
        let cellIndex = thElement.cellIndex;
        let colNum = cellIndex + 1;
        let asc = allTh[cellIndex].toggleAttribute("data-order-by");

        // let allThCleaned = this.#cleanAllThAttributes(allTh, cellIndex, 1);
        // if (allThCleaned !== true)
        //     return;
        
        const tableTbody = theadElement.nextElementSibling;
        
        let rows = [...tableTbody.querySelectorAll("tr")];
        
        let qs = `td:nth-child(${colNum})`;
        
        rows.sort( (r1, r2) => {
            let t1 = r1.querySelector(qs);
            let t1TextContent = t1.textContent.trim().toLowerCase();
            let t2 = r2.querySelector(qs);
            let t2TextContent = t2.textContent.trim().toLowerCase();
            
            return this.#compareValues(t1TextContent, t2TextContent, asc);
        });
        
        rows.forEach(row => tableTbody.append(row));
        
        let iContent = asc === true ? `<i class="fa-solid fa-arrow-up-short-wide"></i>` : `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
        allTh[cellIndex].innerHTML += iContent;
    }

    static addLine(compObj) {
        const table = document.querySelector("#tabela-compromissos");
        
        let descricao = compObj.descricao.ucFirst(true);
        let observacao = compObj.observacao.ucFirst(true);
        let data = compObj.dataHora.toLocaleDateString("pt-BR");
        let hora = compObj.dataHora.toLocaleTimeString("pt-BR");
        let atrasado = compObj.dataHora > new Date() ? "Atrasado" : "Não";
        let ativo = compObj.ativo === true ? "Ativo" : "Não";
    
        let tbodyTr =   `<tr>`;
        tbodyTr +=          `<td>${descricao}</td>`;
        tbodyTr +=          `<td>${observacao}</td>`;
        tbodyTr +=          `<td>${data}</td>`;
        tbodyTr +=          `<td>${hora}</td>`;
        tbodyTr +=          `<td>${atrasado}</td>`;
        tbodyTr +=          `<td>${ativo}</td>`;
        tbodyTr +=      `</tr>`;
    
        table.lastElementChild.insertAdjacentHTML("beforeend", tbodyTr);
    }
    
    static initializeToDoList() {
        let novosCompromissos = [
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
            ],
            [
                "Prova de PHP",
                "Estudar: sintaxe e tipos; laços e iterações; controle de fluxo e manipulação de erro; expressões e operadores; funções; coleções indexadas; objetos",
                "Presidente Prudente",
                "2023-04-12T06:00"
            ]
        ];
    
        let listaCompromissos = new ToDoList();
        novosCompromissos.forEach(comp => {
            listaCompromissos.addCompromisso(new Compromisso(comp[0], comp[1], comp[2], comp[3], true));
        });
    
        sessionStorage.clear();
        let compromissosNoObj = listaCompromissos.items;
        compromissosNoObj.forEach((comp, i) => {
            let id = "comp_" + i+1;
            let data = JSON.stringify(comp);
            Utils.addLine(comp);
            sessionStorage.setItem(id, data);
        });
    
        firstTimeOnToDoList = true;
    }
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

class Compromisso {
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
    #items;

    constructor(items = []) {
        this.#items = items;
    }

    get items() { return this.#items; }

    #sortItems = () => this.#items.sort((a, b) => new Date(a.dataHora) - new Date(b.dataHora));
    // #sortItems = () => this.#items.sort((a, b) => a.descricao.localeCompare(b.descricao) || new Date(a.dataHora) - new Date(b.dataHora));
    addCompromisso = (novoCompromisso) => {
        this.#items.push(novoCompromisso);
        this.#sortItems();
    }
}



let aluno = new Aluno("Diogo", "diogo.scarmagnani@fatec.sp.gov.br", "1990-04-14", "Análise e Desenvolvimento de Sistemas", "15701632598");
console.log(aluno.curso);
console.log(aluno);

function novoCompromisso(e) {
    e.preventDefault();

    let dados = Utils.getValuesDoForm(e.target);
    let descricao = dados.descricao;
    let observacao = dados.observacao;
    let cidade = dados.cidade;
    let dataHora = dados.data + 'T' + dados.hora;
    let novoComp = new Compromisso(descricao, observacao, cidade, dataHora, true);
    console.log("Esqueeeece...");
}

function rodarQuandoCarregar() {
    const urlAtual = new URL(location.href);
    
    if (urlAtual.searchParams.get("rodar")) {
        Utils.initializeToDoList();
        return;
    }

    location.href = "../index.html";
}

document.querySelector("#form-todo-list").addEventListener("submit", novoCompromisso);
document.querySelector("#form-todo-list").addEventListener("reset", () => "Esqueeeece...");
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);