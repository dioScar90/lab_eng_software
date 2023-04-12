function clicarBotao(event) {
    let idClicado = event?.target?.id;

    switch (idClicado) {
        case "atv-1" :
            location = "14_fev/index.html";
        case "atv-2" :
            location = "28_fev/index.html";
        case "atv-3" :
            location = "07_mar/index.html";
        case "atv-4" :
            location = "08_mar/index.html";
        default :
            console.log("Errooooou...");
    }
}

document.addEventListener("click", clicarBotao);