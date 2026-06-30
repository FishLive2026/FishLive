export default class WebSocketManager {

    constructor(scene, liveEvents){
        this.scene = scene;
        this.liveEvents = liveEvents;
    }

    connect(){

        this.socket = new WebSocket("ws://localhost:3000");

        this.socket.onopen = () => {
            console.log("✅ Jogo conectado ao WebSocket");
        };

        this.socket.onmessage = (event) => {

            console.log("📨 Mensagem recebida:", event.data);

            let data = JSON.parse(event.data);

            console.log("👉 Tipo:", data.type);

            switch(data.type){

                case "like":
                    console.log("LIKE EXECUTADO");
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