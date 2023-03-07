function getValuesDoForm(form) {
    let dados = new FormData(form);
    
    let newObj = {};
    for (const [name, val] of dados) {
        newObj[name] = val;
    }

    return newObj;
}

function compareValues(a, b, asc) {
    if (!isNaN(a))
        a = +a;

    if (!isNaN(b))
        b = +b;

    if (asc === true)
        return (a < b) ? -1 : (a > b) ? 1 : 0;
    return (a > b) ? -1 : (a < b) ? 1 : 0;
}

function cleanAllThAttributes(allTh, cellIndex, cellIndexException = -1) {
    try {
        for (let i = 0; i < allTh.length; i++) {
            if (i != cellIndexException) {
                const iFontAwesome = allTh[i].querySelector("i");

                if (iFontAwesome !== null)
                    iFontAwesome.remove();

                if (i != cellIndex)
                    allTh[i].removeAttribute("data-order-by");
            }
        }
        return true;
    } catch (e) {
        console.log(e);
    }
}

function sortTableByColumn(thElement) {
    const theadElement = thElement.closest("thead");
    const allTh = theadElement.querySelectorAll("tr > th");
    let cellIndex = thElement.cellIndex;
    let colNum = cellIndex + 1;
    let asc = allTh[cellIndex].toggleAttribute("data-order-by");

    let allThCleaned = cleanAllThAttributes(allTh, cellIndex, 1);
    if (allThCleaned !== true)
        return;
    
    const tableTbody = theadElement.nextElementSibling;
    
    let rows = [...tableTbody.querySelectorAll("tr")];
    let qs = `td:nth-child(${colNum})`;
    
    rows.sort( (r1, r2) => {
        let t1 = r1.querySelector(qs);
        let t1TextContent = t1.textContent.trim().toLowerCase();
        let t2 = r2.querySelector(qs);
        let t2TextContent = t2.textContent.trim().toLowerCase();
        
        return compareValues(t1TextContent, t2TextContent, asc);
    });
    
    rows.forEach(row => tableTbody.append(row));
    
    let iContent = asc === true ? `<i class="fa-solid fa-arrow-up-short-wide"></i>` : `<i class="fa-solid fa-arrow-down-short-wide"></i>`;
    allTh[cellIndex].innerHTML += iContent;
}

function sortTableByColumn(thElement) {
    let cellIndex = thElement.cellIndex;
    const theadElement = thElement.closest("thead");
    const allTh = theadElement.querySelectorAll("tr > th");
    let asc = allTh[cellIndex].toggleAttribute("data-order-by");

    for (let i = 0; i < allTh.length; i++) {
        if (i != 1) {
            const iFontAwesome = allTh[i].querySelector("i");

            if (iFontAwesome !== null)
                iFontAwesome.remove();

            if (i != cellIndex)
                allTh[i].removeAttribute("data-order-by");
        }
    }
    
    Utils.sortTableByColumn(theadElement, cellIndex, asc);
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

const iniciarAtualizaHora = () => setInterval(atualizaHora, 1000);

async function rodarQuandoCarregar() {
    await diaHoje();
    await iniciarAtualizaHora();
}

document.querySelector("#form-carro").addEventListener("submit", verificarPalindromo);
document.querySelector("#btn-voltar").addEventListener("click", () => location = "../index.html");
// document.addEventListener("DOMContentLoaded", rodarQuandoCarregar);
document.addEventListener("DOMContentLoaded", () => location = "../index.html");