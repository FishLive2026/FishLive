export default class WebSocketManager {

    constructor(scene, liveEvents){

        this.scene = scene;
        this.liveEvents = liveEvents;
        this.socket = null;

    }

    connect(){

        const protocol = location.protocol === "https:" ? "wss" : "ws";

        const url = `${protocol}://${location.host}`;

        console.log("🌐 Conectando em:", url);

        this.socket = new WebSocket(url);

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

                case "status":
                    console.log("📡 Status:", data);
                    break;

                default:
                    console.log("⚠️ Evento desconhecido:", data);

            }

        };

        this.socket.onerror = (event) => {

            console.log("❌ ERRO WEBSOCKET");

            console.log(event);

        };

        this.socket.onclose = (event) => {

            console.log("❌ WS FECHADO");

            console.log("Código:", event.code);

            console.log("Motivo:", event.reason);

            console.log("Fechamento limpo:", event.wasClean);

        };

    }

}