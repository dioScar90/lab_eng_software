String.prototype.ucFirst = function() {
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

class Carro {
    #modelo;
    #marca;
    #ano;
    #cor;
    #quilometragem;
    #valorFipe;

    constructor(modelo, marca, ano, cor, quilometragem, valorFipe) {
        this.#modelo = modelo;
        this.#marca = marca;
        this.#ano = +ano;
        this.#cor = cor;
        this.#quilometragem = +quilometragem;
        this.#valorFipe = +valorFipe;
    }

    /* Os setters foram comentados pois não são necessários. */
    
    get modelo() { return this.#modelo; }
    // set modelo(value) { this.#modelo = value; }

    get marca() { return this.#marca; }
    // set marca(value) { this.#marca = value; }

    get ano() {return this.#ano; }
    // set ano(value) { this.#ano = +value; }

    get cor() { return this.#cor; }
    // set cor(value) { this.#cor = value; }

    get quilometragem() {return  this.#quilometragem; }
    // set quilometragem(value) { this.#quilometragem = +value; }

    get valorFipe() { return this.#valorFipe; }
    // set valorFipe(value) { this.#valorFipe = +value; }
    
    anosUtilizacao() {
        let anoAtual = new Date().getFullYear();
        return anoAtual - this.#ano;
    }

    #valorMercado(kmPorAno) {
        if (kmPorAno <= 30000)
            return this.#valorFipe * 1.1;

        if (kmPorAno > 30000 && kmPorAno <= 50000)
            return this.#valorFipe;

        return this.#valorFipe * 0.9;
    }

    valorMercado() {
        let kmPorAno = this.#quilometragem / this.anosUtilizacao();
        return this.#valorMercado(kmPorAno);
    }
}

function getValuesDoForm(form) {
    let dados = new FormData(form);
    
    let newObj = {};
    for (const [name, val] of dados) {
        newObj[name.replace(/-/g, '_')] = val;
    }

    return newObj;
}

function compareValues(a, b) {
    if (a < b)
        return -1;
    
    if (a > b)
        return 1;
    
    return 0;
}

function sortOrderedList(olElement) {
    if (olElement.children.length == 0)
        return;
    
    let allLi = [...olElement.querySelectorAll("li")];
    
    allLi.sort( (li1, li2) => {
        let t1TextContent = li1.innerHTML.trim().toLowerCase();
        let t2TextContent = li2.innerHTML.trim().toLowerCase();
        
        return compareValues(t1TextContent, t2TextContent);
    });
    
    allLi.forEach(li => olElement.append(li));
}

function adicionarCarroSimples(values) {
    let modelo = values.modelo_simples;
    let marca = values.marca_simples;

    const details = document.querySelector("#details-" + marca);
    const ol = details.lastElementChild;

    ol.insertAdjacentHTML("beforeend", `<li>${modelo.ucFirst()}</li>`);

    if (details.classList.contains("d-none"))
        details.classList.remove("d-none");

    if (details.closest("div").classList.contains("d-none")) {
        details.closest("div").classList.remove("d-none");
        details.closest("div").previousElementSibling.classList.add("d-none");
    }

    sortOrderedList(ol);

    closeAllDetails();
    details.open = true;
}

function aparecerDetalhesCarro(carro) {
    const divDetalhes = document.querySelector("#div-detalhes");
    const dlDetalhes = divDetalhes.querySelector("#dl-detalhes");
    const ddModelo = dlDetalhes.querySelector("#dd-modelo");
    const ddMarca = dlDetalhes.querySelector("#dd-marca");
    const ddAno = dlDetalhes.querySelector("#dd-ano");
    const ddCor = dlDetalhes.querySelector("#dd-cor");
    const ddKm = dlDetalhes.querySelector("#dd-quilometragem");
    const ddValorFipe = dlDetalhes.querySelector("#dd-valor-fipe");
    const ddAnosUtilizacao = dlDetalhes.querySelector("#dd-anos-utilizacao");
    const ddValorMercado = dlDetalhes.querySelector("#dd-valor-mercado");

    ddModelo.innerHTML = carro.modelo.ucFirst();
    ddMarca.innerHTML = carro.marca.ucFirst();
    ddAno.innerHTML = carro.ano;
    ddCor.innerHTML = carro.cor.ucFirst();
    ddKm.innerHTML = carro.quilometragem.toLocaleString("pt-BR");
    ddValorFipe.innerHTML = carro.valorFipe.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
    ddAnosUtilizacao.innerHTML = carro.anosUtilizacao();
    ddValorMercado.innerHTML = carro.valorMercado().toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});

    divDetalhes.previousElementSibling.classList.add("d-none");
    divDetalhes.classList.remove("d-none");
}

function adicionarCarroDetalhado(values) {
    let modelo = values.modelo_detalhado;
    let marca = values.marca_detalhado;
    let ano = values.ano_detalhado;
    let cor = values.cor_detalhado;
    let quilometragem = values.quilometragem_detalhado;
    let valorFipe = values.valor_fipe_detalhado;

    const carro = new Carro(modelo, marca, ano, cor, quilometragem, valorFipe);

    aparecerDetalhesCarro(carro);
}

function adicionarCarro(e) {
    e.preventDefault();
    let values = getValuesDoForm(e.target);

    if (e.target.id == "form-carro-simples") {
        adicionarCarroSimples(values);
        return;
    }

    adicionarCarroDetalhado(values);
}

function closeAllDetails() {
    const allDetails = [...document.querySelectorAll("details:not(.d-none):has(> summary.list-items)")];
    
    allDetails.forEach((detail) => {
        detail.open = false;
    });
}

function limparFormSimples() {
    const divCarros = document.querySelector("#div-carros-simples");
    const allDetails = [...divCarros.querySelectorAll("details")];
    
    allDetails.forEach((detail) => {
        detail.classList.add("d-none");
        detail.querySelector("ol").replaceChildren();
    });

    divCarros.classList.add("d-none");
    divCarros.previousElementSibling.classList.remove("d-none");
}

function limparFormDetalhado() {
    const divDetalhes = document.querySelector("#div-detalhes");
    const allDd = [...divDetalhes.firstElementChild.querySelectorAll("dd")];
    
    allDd.forEach( (dd) => dd.replaceChildren() );
    divDetalhes.classList.add("d-none");
    divDetalhes.previousElementSibling.classList.remove("d-none");
}

function limparForm(e) {
    if (e.target.id == "form-carro-simples") {
        limparFormSimples();
        return;
    }

    limparFormDetalhado();
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

async function rodarQuandoCarregar() {
    console.log("Entrou.");
}

document.querySelector("#form-carro-simples").addEventListener("submit", adicionarCarro);
document.querySelector("#form-carro-simples").addEventListener("reset", limparForm);
document.querySelector("#form-carro-detalhado").addEventListener("submit", adicionarCarro);
document.querySelector("#form-carro-detalhado").addEventListener("reset", limparForm);
document.querySelectorAll("div.principal > details > summary").forEach( item => item.addEventListener("click", clicouDetailPrincipal) );
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);