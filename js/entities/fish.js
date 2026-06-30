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

        for(let i=0;i<25;i++){
            this.spawnFish();
        }
    }

    spawnFish(){

        const sprites=["fishBlue","fishGreen","fishOrange","fishRed","fishPink"];

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

        fish.flipX = fish.direction === -1;

        this.fishes.push(fish);
    }

    spawnSpecialFish(){

        let fish=this.scene.add.image(
            Phaser.Math.Between(150,930),
            Phaser.Math.Between(250,1500),
            "fishRed"
        );

        fish.setScale(5);
        fish.setTint(0xffdd55);
        fish.setDepth(10);

        fish.baseY=fish.y;
        fish.wave=20;
        fish.waveSpeed=0.003;
        fish.offset=Math.random()*1000;
        fish.speed=0.7;
        fish.direction=Math.random()>0.5?1:-1;
        fish.cooldown=0;

        fish.flipX = fish.direction === -1;

        this.scene.tweens.add({
            targets:fish,
            alpha:0.4,
            duration:350,
            yoyo:true,
            repeat:4
        });

        this.fishes.push(fish);
    }

    update(){

        this.fishes.forEach(fish=>{

            if(fish.cooldown>0){
                fish.cooldown--;
            }

            let chasing=false;
            let alvo=null;

            if(this.food && this.food.foods.length && fish.cooldown===0){

                let menor=180;

                this.food.foods.forEach(food=>{

                    let d=Phaser.Math.Distance.Between(
                        fish.x,
                        fish.y,
                        food.x,
                        food.y
                    );

                    if(d<menor){
                        menor=d;
                        alvo=food;
                    }
                });

                if(alvo){

                    chasing=true;

                    fish.x += (alvo.x-fish.x)*0.02;
                    fish.y += (alvo.y-fish.y)*0.02;

                    fish.flipX = alvo.x < fish.x;

                    if(menor < 30){
                        this.food.remove(alvo);
                        fish.cooldown=120;
                        chasing=false;
                    }
                }
            }

            if(!chasing){

                fish.x += fish.speed*fish.direction;

                fish.y =
                    fish.baseY+
                    Math.sin((this.scene.time.now+fish.offset)*fish.waveSpeed)*fish.wave;

                fish.rotation =
                    Math.sin((this.scene.time.now+fish.offset)*0.002)*0.06;

                fish.flipX = fish.direction === -1;

                if(fish.direction===1 && fish.x>1250){
                    fish.x=-150;
                    fish.baseY=Phaser.Math.Between(120,1800);
                }

                if(fish.direction===-1 && fish.x<-150){
                    fish.x=1230;
                    fish.baseY=Phaser.Math.Between(120,1800);
                }
            }
        });
    }
}