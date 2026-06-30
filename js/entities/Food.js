export default class Food {

    constructor(scene){
        this.scene = scene;
        this.foods = [];
    }

    preload(){}

    create(){

        this.graphics = this.scene.add.graphics();

        this.scene.input.on("pointerdown",(pointer)=>{

            for(let i=0;i<8;i++){

                this.foods.push({
                    x:pointer.x + Phaser.Math.Between(-30,30),
                    y:pointer.y + Phaser.Math.Between(-20,20),
                    speed:Phaser.Math.FloatBetween(0.8,1.5),
                    radius:Phaser.Math.Between(4,6)
                });

            }

        });

    }

    remove(food){
        const index = this.foods.indexOf(food);

        if(index !== -1){
            this.foods.splice(index,1);
        }
    }

    update(){

        this.graphics.clear();

        for(let i=this.foods.length-1;i>=0;i--){

            let food=this.foods[i];

            food.y += food.speed;

            if(food.y>1930){
                this.foods.splice(i,1);
                continue;
            }

            this.graphics.fillStyle(0xffcc33);
            this.graphics.fillCircle(food.x,food.y,food.radius);

        }

    }

}