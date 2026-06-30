import Background from "./Background.js";

import Fish from "../entities/Fish.js";
import Food from "../entities/Food.js";
import Plants from "../entities/Plants.js";
import Rocks from "../entities/Rocks.js";

import Bubble from "../effects/Bubble.js";
import LightRays from "../effects/LightRays.js";

export default class GameManager {

    constructor(scene){

        this.scene = scene;

        this.background = new Background(scene);
        this.bubbles = new Bubble(scene);
        this.fishes = new Fish(scene);
        this.food = new Food(scene);
        this.plants = new Plants(scene);
        this.rocks = new Rocks(scene);
        this.lightRays = new LightRays(scene);

    }

    preload(){

        this.background.preload();
        this.bubbles.preload();
        this.fishes.preload();
        this.food.preload();
        this.plants.preload();
        this.rocks.preload();
        this.lightRays.preload();

    }

    create(){

        this.background.create();
        this.lightRays.create();
        this.rocks.create();
        this.plants.create();
        this.bubbles.create();
        this.fishes.create();
        this.food.create();

        this.fishes.food = this.food;

    }

    update(){

        this.background.update();
        this.lightRays.update();
        this.rocks.update();
        this.plants.update();
        this.bubbles.update();
        this.food.update();
        this.fishes.update();

    }

}