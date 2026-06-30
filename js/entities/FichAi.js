import FishAI from "./FishAI.js";

export default class Fish {

    constructor(scene){
        this.scene = scene;
    }

    preload(){
        this.scene.load.image("fishBlue","assets/fish/fish_blue.png");
        this.scene.load.image("fishGreen","assets/fish/fish_green.png");
        this.scene.load.image("fishOrange","assets/fish/fish_orange.png");
        this.scene.load.image("fishRed","assets/fish/fish_red.png");
        this.scene.load.image("fishPink","assets/fish/fish_pink.png");
    }

    create(){

        this.fishes=[];

        const sprites=[
            "fishBlue",
            "fishGreen",
            "fishOrange",
            "fishRed",
            "fishPink"
        ];

        for(let i=0;i<25;i++){

            let key=sprites[Phaser.Math.Between(0,sprites.length-1)];

            let fish=this.scene.add.image(
                Phaser.Math.Between(-200,1280),
                Phaser.Math.Between(120,1800),
                key
            );

            let scale=Phaser.Math.FloatBetween(1.5,4);

            fish.setScale(scale);
            fish.setDepth(scale);

            fish.baseY=fish.y;
            fish.wave=Phaser.Math.FloatBetween(15,35);
            fish.waveSpeed=Phaser.Math.FloatBetween(0.003,0.008);
            fish.offset=Math.random()*1000;
            fish.speed=Phaser.Math.FloatBetween(0.5,2);
            fish.direction=Math.random()>0.5?1:-1;
            fish.cooldown=0;
            fish.isEating=false;

            fish.flipX = fish.direction === -1;

            this.fishes.push(fish);
        }
    }

    update(){

        this.fishes.forEach(fish=>{

            if(fish.cooldown>0){
                fish.cooldown--;
            }

            let chasing=false;

            if(this.food && this.food.foods.length && fish.cooldown===0){

                const result = FishAI.findFood(fish, this.food.foods);

                if(result.alvo){

                    chasing=true;

                    FishAI.chaseFood(fish, result.alvo);

                    if(result.distancia < 30){

                        this.food.remove(result.alvo);

                        fish.cooldown=120;
                        fish.isEating=true;

                        this.scene.tweens.add({
                            targets: fish,
                            scaleX: fish.scaleX * 1.12,
                            scaleY: fish.scaleY * 1.12,
                            duration: 80,
                            yoyo: true,
                            ease: "Sine.easeInOut"
                        });

                        this.scene.time.delayedCall(200,()=>{
                            fish.isEating=false;
                        });
                    }
                }
            }

            if(!chasing){
                FishAI.moveNormal(this.scene, fish);
            }
        });
    }
}