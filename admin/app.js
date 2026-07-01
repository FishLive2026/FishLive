const ws = new WebSocket(
    location.protocol === "https:"
        ? `wss://${location.host}`
        : `ws://${location.host}`
);

ws.onopen = () => {
    console.log("✅ Conectado ao servidor");
};

ws.onclose = () => {
    console.log("❌ Desconectado");
};

function send(event) {
    console.log("📤 Enviando:", event);
    ws.send(JSON.stringify(event));
}

document.getElementById("like").addEventListener("click", () => {
    console.log("❤️ CLICK LIKE");
    send({ type: "like" });
});

document.getElementById("comment").addEventListener("click", () => {
    console.log("💬 CLICK COMMENT");
    send({
        type: "comment",
        comment: "Teste"
    });
});

document.getElementById("follow").addEventListener("click", () => {
    console.log("👤 CLICK FOLLOW");
    send({ type: "follow" });
});

document.getElementById("gift").addEventListener("click", () => {
    console.log("🎁 CLICK GIFT");
    send({
        type: "gift",
        giftName: "Rose"
    });
});