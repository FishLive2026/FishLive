import AudioManager from "../services/AudioService.js";
import Cinematic from "../effects/Cinematic.js";

export default class LiveEvents {

    constructor(scene, food, fishes, hud){

        this.scene = scene;
        this.food = food;
        this.fishes = fishes;
        this.hud = hud;

        this.audio = new AudioManager(scene);
        this.cinematic = new Cinematic(scene);

    }

    create(){

        this.audio.create();

        this.scene.input.keyboard.on("keydown-L",()=>this.likeEvent());
        this.scene.input.keyboard.on("keydown-C",()=>this.commentEvent());
        this.scene.input.keyboard.on("keydown-G",()=>this.giftEvent());
        this.scene.input.keyboard.on("keydown-F",()=>this.followEvent());

    }

    likeEvent(){

        this.audio.playLike();

        this.hud.addLike();

        for(let i=0;i<15;i++){

            this.food.foods.push({
                x:Phaser.Math.Between(100,980),
                y:Phaser.Math.Between(100,400),
                speed:Phaser.Math.FloatBetween(0.8,1.8),
                radius:Phaser.Math.Between(4,7)
            });

        }

    }

    commentEvent(){

        this.audio.playComment();

        this.hud.addComment();

        for(let i=0;i<8;i++){

            this.food.foods.push({
                x:Phaser.Math.Between(100,980),
                y:150,
                speed:Phaser.Math.FloatBetween(1,2),
                radius:Phaser.Math.Between(4,7)
            });

        }

    }

    giftEvent(){

        this.audio.playGift();

        this.cinematic.gift();

        this.hud.addGift();

        this.fishes.spawnSpecialFish();

    }

    followEvent(){

        this.audio.playFollow();

        this.hud.addFollower();

        this.fishes.spawnFish();

    }

}