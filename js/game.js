import GameManager from "./managers/GameManager.js";
import LiveEvents from "./managers/LiveEvents.js";
import WebSocketManager from "./managers/WebSocketManager.js";
import HUD from "./ui/HUD.js";

const config = {
    type: Phaser.AUTO,
    parent: "game",
    backgroundColor: "#0b4c8c",

    scale:{
        mode:Phaser.Scale.FIT,
        autoCenter:Phaser.Scale.CENTER_BOTH,
        width:1080,
        height:1920
    },

    scene:{
        preload,
        create,
        update
    }
};

new Phaser.Game(config);

let gameManager;
let liveEvents;
let hud;
let wsManager;

function preload(){

    gameManager = new GameManager(this);
    hud = new HUD(this);

    // Áudios
    this.load.audio("ambient","assets/audio/ocean_ambience.mp3");
    this.load.audio("bubble","assets/audio/bubble.mp3");
    this.load.audio("coin","assets/audio/coin.mp3");
    this.load.audio("comment","assets/audio/comment.mp3");
    this.load.audio("follow","assets/audio/follow.mp3");
    this.load.audio("galaxy","assets/audio/galaxy.mp3");
    this.load.audio("gift","assets/audio/gift.mp3");
    this.load.audio("pop","assets/audio/pop.mp3");
    this.load.audio("treasure","assets/audio/treasure.mp3");
    this.load.audio("whoosh","assets/audio/whoosh.mp3");

    gameManager.preload();
    hud.preload();

}

function create(){

    gameManager.create();
    hud.create();

    liveEvents = new LiveEvents(
        this,
        gameManager.food,
        gameManager.fishes,
        hud
    );

    liveEvents.create();

    wsManager = new WebSocketManager(this, liveEvents);
    wsManager.connect();

}

function update(){

    gameManager.update();
    hud.update();

}