module.exports = class Broadcaster {

    constructor(server){
        this.server = server;
    }

    send(data){

        const message = JSON.stringify(data);

        this.server.clients.forEach(client => {

            if(client.readyState === 1){
                client.send(message);
            }

        });

    }

}