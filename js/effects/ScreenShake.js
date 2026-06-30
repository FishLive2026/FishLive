export default class ScreenFlash{

    constructor(scene){

        this.scene = scene;

    }

    flash(color = 0xffffff, alpha = 0.35, duration = 180){

        const rect = this.scene.add.rectangle(
            540,
            960,
            1080,
            1920,
            color,
            alpha
        );

        rect.setDepth(9999);

        this.scene.tweens.add({

            targets: rect,

            alpha: 0,

            duration,

            onComplete: () => {

                rect.destroy();

            }

        });

    }

}