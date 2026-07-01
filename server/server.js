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

let tiktok = null;

console.log("🚀 FishLive iniciado");

wss.on("connection", (ws) => {

    console.log("✅ Cliente conectado");

    ws.on("message", async (message) => {

        const data = JSON.parse(message.toString());

        console.log("📨", data);

        switch (data.type) {

            case "connect":

                console.log(`🎥 Conectando em @${data.username}`);

                try {

                    if (tiktok && tiktok.connection) {
                        await tiktok.connection.disconnect();
                    }

                } catch (e) {}

                tiktok = new TikTokConnector(data.username, broadcaster);

                tiktok.connect();

                break;

            case "reconnect":

                if (tiktok) {
                    tiktok.connect();
                }

                break;

            default:

                broadcaster.send(data);

        }

    });

});

server.listen(3000, () => {

    console.log("🌐 HTTP + WebSocket na porta 3000");

});