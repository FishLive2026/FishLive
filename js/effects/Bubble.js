export default class Bubble {

    constructor(scene){

        this.scene = scene;

    }

    preload(){

        this.scene.load.image(
            "bubbleA",
            "assets/effects/bubble_a.png"
        );

        this.scene.load.image(
            "bubbleB",
            "assets/effects/bubble_b.png"
        );

        this.scene.load.image(
            "bubbleC",
            "assets/effects/bubble_c.png"
        );

    }

    create(){

        this.bubbles=[];

        const sprites=[
            "bubbleA",
            "bubbleB",
            "bubbleC"
        ];

        for(let i=0;i<80;i++){

            let key=sprites[
                Phaser.Math.Between(0,2)
            ];

            let bubble=this.scene.add.image(

                Phaser.Math.Between(20,1060),

                Phaser.Math.Between(0,1920),

                key

            );

            bubble.setScale(
                Phaser.Math.FloatBetween(0.5,2.5)
            );

            bubble.speed=
                Phaser.Math.FloatBetween(0.5,2);

            bubble.drift=
                Phaser.Math.FloatBetween(-0.4,0.4);

            this.bubbles.push(bubble);

        }

    }

    update(){

        this.bubbles.forEach(b=>{

            b.y-=b.speed;

            b.x+=b.drift;

            if(b.y<-50){

                b.y=1950;

                b.x=Phaser.Math.Between(20,1060);

            }

        });

    }

}