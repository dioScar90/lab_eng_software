class TempoTotalPlaylistYouTube {
    #divPrincipal;
    #allVideos;

    constructor(document = window.document) {
        this.#divPrincipal = [...document.querySelectorAll("div#columns div#secondary div#container.ytd-playlist-panel-renderer div#items div")];
        this.#allVideos = this.#getAllVideosAsNodeElements();
    };

    #getAllVideosAsNodeElements() {
        let uauAux = [];

        this.#divPrincipal.forEach(item => {
            const b = item.querySelector("span.ytd-thumbnail-overlay-time-status-renderer");
            
            if (b) {
                let str = b.innerHTML.trim();
                let arrStr = str.split(":");
                let timee = new Date(0);

                timee.setHours(0);
                timee.setMinutes(+arrStr[0]);
                timee.setSeconds(+arrStr[1]);

                uauAux.push(timee);
            }
        });

        return uauAux;
    }

    #reduceAllTimeOfVideos() {
        let initialTime = new Date(0);
        initialTime.setHours(0);
        
        return this.#allVideos.reduce((tempoTotal, esseTempo) => {
            let segundoAtual = tempoTotal.getSeconds();
            let minutoAtual = tempoTotal.getMinutes();
        
            tempoTotal.setSeconds(segundoAtual + esseTempo.getSeconds());
            tempoTotal.setMinutes(minutoAtual + esseTempo.getMinutes());

            return tempoTotal;
        }, initialTime);
    }

    async getTotalTime() {
        let finalTimeAsDateTime = await this.#reduceAllTimeOfVideos();
        return finalTimeAsDateTime.toLocaleTimeString();
    }
}

const yes = new TempoTotalPlaylistYouTube;