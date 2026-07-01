module.exports = class Broadcaster {

    constructor(server){
        this.server = server;
    }

    send(data){

        const message = JSON.stringify(data);

        console.log("📡 Broadcast:", message);
        console.log("👥 Clientes conectados:", this.server.clients.size);

        this.server.clients.forEach(client => {

            console.log("➡️ Enviando para cliente:", client.readyState);

            if(client.readyState === 1){
                client.send(message);
            }

        });

    }

}