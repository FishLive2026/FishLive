const WebSocket = require("ws");

const socket = new WebSocket("ws://localhost:3000");

socket.on("open", () => {

    console.log("Conectado ao servidor");

    const eventos = [
        { type: "like" },
        { type: "comment", comment: "Boa live!" },
        { type: "follow" },
        { type: "gift", gift: "Rose" }
    ];

    let i = 0;

    const intervalo = setInterval(() => {

        if(i >= eventos.length){

            clearInterval(intervalo);

            socket.close();

            return;

        }

        console.log("Enviando:", eventos[i]);

        socket.send(JSON.stringify(eventos[i]));

        i++;

    }, 2000);

});

socket.on("close", () => {

    console.log("Teste finalizado");

});