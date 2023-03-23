var firstTimeOnToDoList = false;
var listaCompromissos = false;
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

    static deleteCompromisso(tr) {
        const tbody = tr.closest("tbody");
        let id = tr.id;
        let compObj = listaCompromissos.items.find(comp => comp.id == id);
        compObj.deleteCompromisso();
        
        tr.remove();
        sessionStorage.removeItem(id);

        this.getButtonsEvents();
        this.disableBtnUpDown();

        if (tbody.children.length == 0) {
            tbody.closest("table").classList.add("d-none");
            tbody.closest("table").previousElementSibling.classList.remove("d-none");
        }
    }

    static #moverDefinitivamente(btnUp, tr) {
        const trClone = tr.cloneNode(true);

        if (btnUp === true) {
            const trBefore = tr.previousElementSibling;
            trBefore.before(trClone);
            tr.remove();
            return;
        }
    
        const trAfter = tr.nextElementSibling;
        trAfter.after(trClone);
        tr.remove();
    }

    static moveButtonUpDown(btn) {
        let btnUp = btn.classList.contains("btn-up");
        const tr = btn.closest("tr");

        this.#moverDefinitivamente(btnUp, tr);
        
        this.getButtonsEvents();
        this.disableBtnUpDown();
    }

    static #prepareButton = (e) => {
        if (e.target.classList.contains("rm-trash")) {
            this.deleteCompromisso(e.target.closest("tr"));
            return;
        }

        this.moveButtonUpDown(e.target);
    }

    static getButtonsEvents() {
        document.querySelectorAll(".rm-trash, .btn-up, .btn-down").forEach( item => item.addEventListener("click", this.#prepareButton) );
    }

    static addLine(compObj) {
        const table = document.querySelector("#tabela-compromissos");
        
        let descricao = compObj.descricao.ucFirst(true);
        let observacao = compObj.observacao == '' ? "---" : compObj.observacao.ucFirst(true);
        let data = compObj.dataHora.toLocaleDateString("pt-BR");
        let hora = compObj.dataHora.toLocaleTimeString("pt-BR");
        let acoes = "<button type='button' class='rm-trash' title='Excluir compromisso'>&#x1F5D1;</button>";
        acoes += "<button type='button' class='btn-up'>&#9650;</button>";
        acoes += "<button type='button' class='btn-down'>&#9660;</button>";
        let status = compObj.concluido === true ? "Concluído" : (compObj.dataHora > new Date() ? "Em aberto" : "Atrasado");
    
        let tbodyTr =   `<tr id="${compObj.id}">`;
        tbodyTr +=          `<td>${descricao}</td>`;
        tbodyTr +=          `<td>${observacao}</td>`;
        tbodyTr +=          `<td>${data}</td>`;
        tbodyTr +=          `<td>${hora}</td>`;
        tbodyTr +=          `<td>${acoes}</td>`;
        tbodyTr +=          `<td>${status}</td>`;
        tbodyTr +=      `</tr>`;
    
        table.lastElementChild.insertAdjacentHTML("beforeend", tbodyTr);

        if (table.classList.contains("d-none")) {
            table.classList.remove("d-none");
            table.previousElementSibling.classList.add("d-none");
        }
        
        limparFormToDoList(true);
    }

    static disableBtnUpDown() {
        [...document.querySelectorAll(".btn-up, .btn-down")].forEach((btn, i, allBtn) => {
            btn.disabled = btn == allBtn.at(0) || btn == allBtn.at(-1) ? true : false;
        })

        this.getButtonsEvents();
    }

    static mountTableBySessionStorage(listaCompromissos, firstMount = false) {
        if (firstMount === true) {
            let sessionKeys = Object.keys(sessionStorage);
            for (let i = 0; i < sessionKeys.length; i++) {
                let compObj = JSON.parse(sessionStorage.getItem(sessionKeys[i]));
                let comp = new Compromisso("comp_" + (listaCompromissos.items.length + 1), compObj.descricao, compObj.observacao, compObj.dataHora, compObj.concluido);
                listaCompromissos.addCompromisso(comp);
            }
        }

        document.querySelector("#tabela-compromissos > tbody").replaceChildren();
        listaCompromissos.items.forEach( comp => this.addLine(comp.getCompromissoParaJson()) );
        this.disableBtnUpDown();
    }
    
    static initializeToDoList(listaCompromissos) {
        let novosCompromissos = [
            [
                "Prova de Matemática",
                "Estudar: matrizes; determinantes; sistemas lineares",
                "2023-04-13T19:00",
                false
            ],
            [
                "Prova do TOEIC",
                "Estudar: Inglês a rodo",
                "2022-12-06T19:00",
                true
            ],
            [
                "Volta às aulas",
                '',
                "2023-02-08T19:00",
                false
            ],,
            [
                "Prova de PHP",
                "Estudar: conceitos de POO",
                "2023-04-14T21:00",
                false
            ],
            [
                "Prova de Redes",
                "Estudar: TIC domicílios",
                "2023-04-12T19:00",
                false
            ],
            [
                "Prova de Lab. Eng. Software",
                "Estudar: sintaxe e tipos; laços e iterações; controle de fluxo e manipulação de erro; expressões e operadores; funções; coleções indexadas; objetos",
                "2023-04-11T19:00",
                false
            ],
            [
                "Prova de PHP",
                "Estudar: sintaxe e tipos; laços e iterações; controle de fluxo e manipulação de erro; expressões e operadores; funções; coleções indexadas; objetos",
                "2023-04-12T06:00",
                false
            ]
        ];
    
        // let listaCompromissos = new ToDoList();
        novosCompromissos.forEach(comp => {
            listaCompromissos.addCompromisso(new Compromisso("comp_" + (listaCompromissos.items.length + 1), comp[0], comp[1], comp[2], comp[3], comp[4]));
        });
    
        sessionStorage.clear();
        let compromissosNoObj = listaCompromissos.items;
        compromissosNoObj.forEach((comp, i) => {
            let id = "comp_" + i+1;
            let compObj = comp.getCompromissoParaJson();
            let data = JSON.stringify(compObj);
            this.addLine(compObj, id);
            sessionStorage.setItem(id, data);
        });
        this.disableBtnUpDown();
    
        firstTimeOnToDoList = true;
    }
}

class Pessoa {
    #nome;
    #email;
    #dataNascimento;

    constructor(nome, email, dataNascimento) {
        if (this.constructor == Pessoa)
            throw new Error("Classe 'Pessoa' não pode ser instanciada, apenas herdada.");
        
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
    #id;
    #descricao;
    #observacao;
    #dataHora;
    #concluido;
    #ativo;

    constructor(id, descricao, observacao, dataHora, concluido = false) {
        this.#id = id;
        this.#descricao = descricao.trim();
        this.#observacao = observacao.trim();
        this.#dataHora = new Date(dataHora);
        this.#concluido = concluido;
        this.#ativo = true;
    }

    get id() { return this.#id; }

    get descricao() { return this.#descricao; }
    set descricao(value) { this.#descricao = value; }

    get observacao() { return this.#observacao; }
    set observacao(value) { this.#observacao = value; }
    
    get dataHora() { return this.#dataHora; }
    set dataHora(value) { this.#dataHora = new Date(value); }

    get concluido() { return this.#concluido; }
    set concluido(value) { this.#concluido = value; }

    getCompromissoParaJson() {
        let obj = {};

        obj.id = this.#id;
        obj.descricao = this.#descricao;
        obj.observacao = this.#observacao;
        obj.dataHora = this.#dataHora;
        obj.concluido = this.#concluido;

        return obj;
    }

    deleteCompromisso = () => this.#ativo = false;
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

    deleteAll = () => {
        this.#items = [];
        sessionStorage.clear();
    }
}

function novoCompromisso(e) {
    e.preventDefault();

    let dados = Utils.getValuesDoForm(e.target);
    let descricao = dados.descricao;
    let observacao = dados.observacao;
    let dataHora = dados.data + 'T' + dados.hora;
    let novoComp = new Compromisso("comp_" + (listaCompromissos.items.length + 1), descricao, observacao, dataHora);

    let id = "comp_" + (sessionStorage.length + 1);
    let compStr = JSON.stringify(novoComp.getCompromissoParaJson());
    listaCompromissos.addCompromisso(novoComp);
    sessionStorage.setItem(id, compStr);
    
    Utils.mountTableBySessionStorage(listaCompromissos);
}

function limparFormProfessorAluno() {
    const divCarros = document.querySelector("#div-carros-simples");
    const allDetails = [...divCarros.querySelectorAll("details")];
    
    allDetails.forEach((detail) => {
        detail.classList.add("d-none");
        detail.querySelector("ol").replaceChildren();
    });

    divCarros.classList.add("d-none");
    divCarros.previousElementSibling.classList.remove("d-none");
}

function limparFormToDoList(limparSomenteForm = false) {
    const form = document.querySelector("form#form-todo-list")
    const allInput = [...form.querySelectorAll("input")];
    allInput.forEach( input => input.value = '' );

    if (limparSomenteForm === true)
        return;

    const divSemDetalhes = form.closest("details").querySelector("#div-sem-detalhes");
    const table = divSemDetalhes.nextElementSibling;
    
    table.lastElementChild.replaceChildren();

    listaCompromissos.deleteAll();

    divSemDetalhes.classList.remove("d-none");
    table.classList.add("d-none");
}

function limparForm(e) {
    if (e.target.id == "form-professor-aluno") {
        limparFormProfessorAluno();
        return;
    }

    limparFormToDoList();
}

function mudarCorTextoResumo(fechouTodos = false) {
    if (fechouTodos === true) {
        document.querySelector("div#texto-resumo").classList.remove("color-grey");
        return;
    }

    document.querySelector("div#texto-resumo").classList.add("color-grey");
}

function fecharOutroDetail(idAberto) {
    let strSelector = idAberto == "exercicio-1" ? "details#exercicio-2" : "details#exercicio-1";
    document.querySelector(strSelector).open = false;
}

function clicouDetailPrincipal(e) {
    if (e.target.closest("details").open === true) {
        mudarCorTextoResumo(true);
        return;
    }

    let id = e.target.closest("details").id;
    fecharOutroDetail(id);
    mudarCorTextoResumo();
}

function iniciarCompromissos() {
    listaCompromissos = new ToDoList();
    const urlAtual = new URL(location.href);
    
    if (urlAtual.searchParams.get("rodar")) {
        if (sessionStorage.length == 0) {
            Utils.initializeToDoList(listaCompromissos);
            return;
        }
    
        Utils.mountTableBySessionStorage(listaCompromissos, true);
        return;
    }
    
    location.href = "../index.html";
}

async function rodarQuandoCarregar() {
    await iniciarCompromissos();
    await Utils.getButtonsEvents();

    // Printa um novo objeto de 'Aluno'.
    console.log(new Aluno("Diogo", "diogo.scarmagnani@fatec.sp.gov.br", "1990-04-14", "Análise e Desenvolvimento de Sistemas", "1570482111046"));

    // Printa o erro ao tentar instanciar 'Pessoa'.
    console.log(new Pessoa("Diogo", "diogo.scarmagnani@fatec.sp.gov.br", "1990-04-14"));
}

document.querySelector("#form-todo-list, #form-cadastro").addEventListener("submit", novoCompromisso);
document.querySelector("#form-todo-list, #form-cadastro").addEventListener("reset", limparForm);
document.querySelectorAll("div.principal > details > summary").forEach( item => item.addEventListener("click", clicouDetailPrincipal) );
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);