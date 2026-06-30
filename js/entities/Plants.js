export default class Plants {

    constructor(scene){
        this.scene = scene;
    }

    preload(){
        this.scene.load.image("seaweedA","assets/plants/background_seaweed_a.png");
        this.scene.load.image("seaweedB","assets/plants/background_seaweed_b.png");
        this.scene.load.image("seaweedC","assets/plants/background_seaweed_c.png");
        this.scene.load.image("seaweedD","assets/plants/background_seaweed_d.png");
    }

    create(){

        this.plants = [];

        const sprites = ["seaweedA","seaweedB","seaweedC","seaweedD"];

        for(let i=0;i<18;i++){

            let plant = this.scene.add.image(
                Phaser.Math.Between(40,1040),
                Phaser.Math.Between(1550,1900),
                sprites[Phaser.Math.Between(0,sprites.length-1)]
            );

            plant.setScale(Phaser.Math.FloatBetween(0.8,1.8));
            plant.setDepth(0.5);
            plant.baseX = plant.x;
            plant.offset = Math.random()*1000;

            this.plants.push(plant);
        }
    }

    update(){

        this.plants.forEach(plant=>{
            plant.x = plant.baseX + Math.sin((this.scene.time.now+plant.offset)*0.002)*8;
            plant.rotation = Math.sin((this.scene.time.now+plant.offset)*0.002)*0.08;
        });

    }

}