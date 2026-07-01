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

    ws.send(JSON.stringify(event));

}

document.getElementById("like").onclick = () => {

    send({
        type:"like"
    });

};

document.getElementById("comment").onclick = () => {

    send({
        type:"comment",
        comment:"Teste"
    });

};

document.getElementById("follow").onclick = () => {

    send({
        type:"follow"
    });

};

document.getElementById("gift").onclick = () => {

    send({
        type:"gift",
        giftName:"Rose"
    });

};