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

const USERNAME = "cristallivegame";
const tiktok = new TikTokConnector(USERNAME, broadcaster);

console.log("🚀 FishLive iniciado");

wss.on("connection", (ws) => {

    console.log("✅ Cliente conectado");

    ws.on("message", (message) => {

        console.log("📨 Mensagem recebida:", message.toString());

        try {

            const data = JSON.parse(message.toString());

            console.log("📦 JSON:", data);

            broadcaster.send(data);

        } catch (err) {

            console.log("❌ Erro ao processar mensagem:", err.message);

        }

    });

    ws.on("close", () => {
        console.log("❌ Cliente desconectado");
    });

});

server.listen(3000, () => {

    console.log("🌐 HTTP + WebSocket na porta 3000");

    tiktok.connect();

});