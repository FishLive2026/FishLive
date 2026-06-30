import ScreenFlash from "./ScreenFlash.js";
import ScreenShake from "./ScreenShake.js";
import CoinRain from "./CoinRain.js";

export default class Cinematic{

    constructor(scene){

        this.scene = scene;

        this.flashEffect = new ScreenFlash(scene);
        this.shakeEffect = new ScreenShake(scene);
        this.coinRain = new CoinRain(scene);

    }

    gift(){

        this.flashEffect.flash(0xffdd55);
        this.shakeEffect.shake(250);
        this.coinRain.play(25);

    }

    galaxy(){

        this.flashEffect.flash(0xffffff,0.6,350);
        this.shakeEffect.shake(500,0.02);
        this.coinRain.play(80);

    }

}