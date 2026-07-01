module.exports = class Broadcaster {

    constructor(server){
        this.server = server;
    }

    send(data){

        const message = JSON.stringify(data);

        console.log("================================");
        console.log("📡 BROADCAST");
        console.log(message);
        console.log("Clientes:", this.server.clients.size);

        let i = 1;

        this.server.clients.forEach(client => {

            console.log(
                `Cliente ${i} | readyState=${client.readyState}`
            );

            if(client.readyState === 1){

                console.log(`✅ Enviado para cliente ${i}`);

                client.send(message);

            }else{

                console.log(`❌ Cliente ${i} ignorado`);

            }

            i++;

        });

        console.log("================================");

    }

}