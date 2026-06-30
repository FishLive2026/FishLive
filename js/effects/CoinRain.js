export default class CoinRain{

    constructor(scene){
        this.scene = scene;
    }

    play(amount = 40){

        for(let i=0;i<amount;i++){

            const coin = this.scene.add.text(
                Phaser.Math.Between(80,1000),
                Phaser.Math.Between(-300,0),
                "🪙",
                {
                    fontSize:"38px"
                }
            );

            coin.setDepth(500);

            this.scene.tweens.add({
                targets: coin,
                y: Phaser.Math.Between(1200,1900),
                x: coin.x + Phaser.Math.Between(-120,120),
                angle: Phaser.Math.Between(-360,360),
                duration: Phaser.Math.Between(1200,2200),
                ease: "Sine.easeIn",
                onComplete:()=>{
                    coin.destroy();
                }
            });

        }

    }

}