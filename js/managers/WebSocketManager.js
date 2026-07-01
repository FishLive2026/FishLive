export default class WebSocketManager {

    constructor(scene, liveEvents){
        this.scene = scene;
        this.liveEvents = liveEvents;
    }

    connect(){

        const protocol = location.protocol === "https:" ? "wss" : "ws";

        this.socket = new WebSocket(`${protocol}://${location.host}`);

        this.socket.onopen = () => {
            console.log("✅ Jogo conectado ao WebSocket");
        };

        this.socket.onmessage = (event) => {

            console.log("📨 Mensagem recebida:", event.data);

            const data = JSON.parse(event.data);

            switch(data.type){

                case "like":
                    this.liveEvents.likeEvent();
                    break;

                case "comment":
                    this.liveEvents.commentEvent();
                    break;

                case "gift":
                    this.liveEvents.giftEvent();
                    break;

                case "follow":
                    this.liveEvents.followEvent();
                    break;

            }

        };

        this.socket.onerror = (e)=>{
            console.log("ERRO WS", e);
        };

        this.socket.onclose = ()=>{
            console.log("WS FECHADO");
        };

    }

}