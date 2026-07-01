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

function send(event){
    console.log("📤", event);
    ws.send(JSON.stringify(event));
}

document.getElementById("connect").onclick = () => {

    send({
        type: "connect",
        username: document.getElementById("username").value.trim()
    });

};

document.getElementById("reconnect").onclick = () => {

    send({
        type: "reconnect"
    });

};

document.getElementById("like").onclick = () => {
    send({ type:"like" });
};

document.getElementById("comment").onclick = () => {
    send({
        type:"comment",
        comment:"Teste"
    });
};

document.getElementById("follow").onclick = () => {
    send({ type:"follow" });
};

document.getElementById("gift").onclick = () => {
    send({
        type:"gift",
        giftName:"Rose"
    });
};