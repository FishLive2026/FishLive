const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const Broadcaster = require("./live/Broadcaster");
const TikTokConnector = require("./live/TikTokConnector");

const app = express();

app.use(express.static(path.join(__dirname, "..")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.get("/admin", (req, res) => {
    res.redirect("/admin/");
});

app.get("/admin/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "admin", "index.html"));
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const broadcaster = new Broadcaster(wss);

let username = "cristallivegame";
let tiktok = new TikTokConnector(username, broadcaster);

console.log("🚀 FishLive iniciado");

wss.on("connection", (ws) => {

    console.log("✅ Cliente conectado");

    ws.on("message", (message) => {

        const data = JSON.parse(message.toString());

        console.log("📨", data);

        switch (data.type) {

            case "connect":

                username = data.username.trim();

                console.log(`🎥 Usuário selecionado: @${username}`);

                // Por enquanto apenas guarda o usuário.
                // Na próxima etapa faremos a reconexão sem reiniciar o servidor.

                break;

            case "reconnect":

                console.log("🔄 Reconectar solicitado");

                break;

            default:

                broadcaster.send(data);

        }

    });

});

server.listen(3000, () => {

    console.log("🌐 HTTP + WebSocket na porta 3000");

    tiktok.connect();

});