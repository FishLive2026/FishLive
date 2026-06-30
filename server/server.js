const WebSocket = require("ws");

const Broadcaster = require("./live/Broadcaster");
const TikTokConnector = require("./live/TikTokConnector");

const wss = new WebSocket.Server({ port: 3000 });

const broadcaster = new Broadcaster(wss);

const USERNAME = "cristallivegame";

const tiktok = new TikTokConnector(USERNAME, broadcaster);

console.log("🚀 Cristal Live Engine iniciada na porta 3000");

wss.on("connection", (ws) => {

    console.log("✅ Cliente conectado");

    ws.on("message", (message) => {

        try {

            const data = JSON.parse(message.toString());

            console.log("📨 Evento manual:", data);

            broadcaster.send(data);

        } catch (error) {

            console.log("❌ Erro ao processar mensagem:", error.message);

        }

    });

    ws.on("close", () => {
        console.log("❌ Cliente desconectado");
    });

});

tiktok.connect();