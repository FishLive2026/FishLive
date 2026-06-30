import HUD from "./HUD.js";
import NotificationManager from "./NotificationManager.js";

export default class UIManager {

    constructor(scene){

        this.scene = scene;

        this.hud = new HUD(scene);
        this.notifications = new NotificationManager(scene);

    }

    preload(){

        this.hud.preload();
        this.notifications.preload();

    }

    create(){

        this.hud.create();
        this.notifications.create();

    }

    update(){

        this.hud.update();
        this.notifications.update();

    }

}