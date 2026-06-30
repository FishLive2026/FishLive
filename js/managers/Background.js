export default class Background {

    constructor(scene){
        this.scene = scene;
    }

    preload(){

        this.scene.load.image(
            "bubble",
            "assets/effects/bubble_a.png"
        );

    }

    create(){

        const graphics = this.scene.add.graphics();

        graphics.fillGradientStyle(
            0x3db8ff,
            0x3db8ff,
            0x0b5ca8,
            0x02284f,
            1
        );

        graphics.fillRect(0,0,1080,1920);

        this.bubbles = [];

        for(let i=0;i<40;i++){

            let bubble = this.scene.add.image(

                Phaser.Math.Between(20,1060),

                Phaser.Math.Between(0,1920),

                "bubble"

            );

            bubble.setScale(
                Phaser.Math.FloatBetween(1,3)
            );

            bubble.speed =
                Phaser.Math.FloatBetween(0.5,2);

            this.bubbles.push(bubble);

        }

    }

    update(){

        this.bubbles.forEach(b=>{

            b.y -= b.speed;

            if(b.y < -50){

                b.y = 1950;

                b.x = Phaser.Math.Between(20,1060);

            }

        });

    }

}