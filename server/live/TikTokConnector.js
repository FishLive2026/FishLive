const { TikTokLiveConnection } = require("tiktok-live-connector");

class TikTokConnector {

    constructor(username, broadcaster) {

        this.username = username.replace("@", "");
        this.broadcaster = broadcaster;
        this.connection = null;

    }

    async connect() {

        console.log(`🎥 Conectando em @${this.username}`);

        try {

            this.connection = new TikTokLiveConnection(this.username);

            this.connection.on("connected", () => {

                console.log("🟢 LIVE CONECTADA");

                this.broadcaster.send({
                    type: "status",
                    connected: true,
                    username: this.username
                });

            });

            this.connection.on("disconnected", () => {

                console.log("🔴 LIVE DESCONECTADA");

                this.broadcaster.send({
                    type: "status",
                    connected: false
                });

            });

            this.connection.on("like", (data) => {

                this.broadcaster.send({
                    type: "like",
                    likes: data.likeCount,
                    user: data.uniqueId
                });

            });

            this.connection.on("chat", (data) => {

                this.broadcaster.send({
                    type: "comment",
                    comment: data.comment,
                    user: data.uniqueId
                });

            });

            this.connection.on("follow", (data) => {

                this.broadcaster.send({
                    type: "follow",
                    user: data.uniqueId
                });

            });

            this.connection.on("gift", (data) => {

                this.broadcaster.send({
                    type: "gift",
                    giftName: data.giftName,
                    repeatCount: data.repeatCount,
                    user: data.uniqueId
                });

            });

            await this.connection.connect();

        } catch (err) {

            console.log("❌ Erro ao conectar:", err.message);

            this.broadcaster.send({
                type: "status",
                connected: false,
                error: err.message
            });

        }

    }

}

module.exports = TikTokConnector;