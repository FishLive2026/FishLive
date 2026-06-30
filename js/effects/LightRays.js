export default class LightRays {

    constructor(scene){
        this.scene = scene;
    }

    preload(){}

    create(){

        this.rays = [];

        for(let i=0;i<7;i++){

            let ray = this.scene.add.graphics();

            ray.fillStyle(0xffffff,0.08);

            ray.fillTriangle(
                0,0,
                80,0,
                300,1920
            );

            ray.x = Phaser.Math.Between(0,1080);
            ray.y = 0;
            ray.angle = Phaser.Math.Between(-12,12);
            ray.speed = Phaser.Math.FloatBetween(0.15,0.45);
            ray.setDepth(0.2);

            this.rays.push(ray);
        }
    }

    update(){

        this.rays.forEach(ray=>{

            ray.x += ray.speed;

            if(ray.x > 1250){
                ray.x = -250;
            }

        });
    }
}