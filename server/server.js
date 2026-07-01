const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const path = require("path");

const Broadcaster = require("./live/Broadcaster");
const TikTokConnector = require("./live/TikTokConnector");

const app = express();

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..")));

// Página principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "index.html"));
});

// Painel Admin
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

        try {

            const data = JSON.parse(message.toString());

            broadcaster.send(data);

        } catch (err) {

            console.log(err.message);

        }

    });

});

server.listen(3000, () => {

    console.log("🌐 HTTP + WebSocket na porta 3000");

    tiktok.connect();

});