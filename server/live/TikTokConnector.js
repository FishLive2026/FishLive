const { TikTokLiveConnection } = require("tiktok-live-connector");

class TikTokConnector {

    constructor(username, broadcaster) {
        this.username = username;
        this.broadcaster = broadcaster;
        this.connection = null;
    }

    async connect() {

        console.log("Conectando na live...");

        this.connection = new TikTokLiveConnection("@" + this.username, {});

        this.connection.on("connected", (state) => {

            console.log("🟢 LIVE CONECTADA");
            console.log("Room ID:", state.roomId);

        });

        this.connection.on("like", (data) => {

            console.log(`❤️ ${data.uniqueId} enviou ${data.likeCount} likes`);

            this.broadcaster.send({
                type: "like",
                user: data.uniqueId,
                likes: data.likeCount
            });

        });

        this.connection.on("chat", (data) => {

            console.log(`💬 ${data.uniqueId}: ${data.comment}`);

            this.broadcaster.send({
                type: "comment",
                user: data.uniqueId,
                comment: data.comment
            });

        });

        this.connection.on("follow", (data) => {

            console.log(`👤 ${data.uniqueId} começou a seguir`);

            this.broadcaster.send({
                type: "follow",
                user: data.uniqueId
            });

        });

        this.connection.on("gift", (data) => {

            console.log(`🎁 ${data.uniqueId} enviou ${data.giftName}`);

            this.broadcaster.send({
                type: "gift",
                user: data.uniqueId,
                gift: data.giftName,
                repeatCount: data.repeatCount
            });

        });

        try {

            await this.connection.connect();

            console.log("✅ Conectado à live!");

        } catch (err) {

            console.log("❌ Erro ao conectar:");
            console.log(err);

        }

    }

}

module.exports = TikTokConnector;