class TempoTotalPlaylistYouTube {
    #divPrincipal;
    #allVideos;
    #allDateTime;
    #finalTimeAsDateTime;

    constructor(document = window.document) {
        this.#divPrincipal = [...document.querySelectorAll("div#columns div#secondary div#container.ytd-playlist-panel-renderer div#items div")];
        
        this.#allVideos = [];
        this.#allDateTime = [];

        this.#putAllVideoNode();
        this.#getAllVideosAsNodeElements();

        this.#finalTimeAsDateTime = this.#reduceAllTimeOfVideos();
    };

    get divPrincipal() { return this.#divPrincipal; }
    get allVideos() { return this.#allVideos; }
    get allDateTime() { return this.#allDateTime; }
    get finalTimeAsDateTime() { return this.#finalTimeAsDateTime; }
    get finalTime() { return this.#finalTimeAsDateTime.toLocaleTimeString(); }

    #putAllVideoNode() {
        this.#divPrincipal.forEach(item => {
            const b = item.querySelector("span.ytd-thumbnail-overlay-time-status-renderer");
            
            if (b && !this.#allVideos.includes(b))
                this.#allVideos.push(b);
        });
    }

    #getAllVideosAsNodeElements() {
        this.#allVideos.forEach(item => {
            let str = item.innerHTML.trim();
            let arrStr = str.split(":");
            let timee = new Date();

            timee.setHours(0);
            timee.setMinutes(+arrStr[0]);
            timee.setSeconds(+arrStr[1]);

            this.#allDateTime.push(timee);
        });
    }

    #reduceAllTimeOfVideos() {
        let initialTime = new Date();
        initialTime.setHours(0);
        initialTime.setMinutes(0);
        initialTime.setSeconds(0);
        
        return this.#allDateTime.reduce((tempoTotal, esseTempo) => {
            let segundoAtual = tempoTotal.getSeconds();
            let minutoAtual = tempoTotal.getMinutes();
        
            tempoTotal.setSeconds(segundoAtual + esseTempo.getSeconds());
            tempoTotal.setMinutes(minutoAtual + esseTempo.getMinutes());

            return tempoTotal;
        }, initialTime);
    }
}

const yes = new TempoTotalPlaylistYouTube;
yes.finalTime;