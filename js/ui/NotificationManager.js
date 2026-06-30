export default class NotificationManager {

    constructor(scene){
        this.scene = scene;
        this.queue = [];
        this.y = 280;
    }

    preload(){}

    create(){}

    show(icon, text){

        const container = this.scene.add.container(1080, this.y);
        container.setDepth(300);

        const bg = this.scene.add.graphics();
        bg.fillStyle(0x000000, 0.55);
        bg.fillRoundedRect(0, 0, 520, 85, 20);

        const label = this.scene.add.text(25, 22, `${icon} ${text}`, {
            fontSize: "28px",
            color: "#ffffff",
            fontStyle: "bold"
        });

        container.add([bg, label]);

        this.scene.tweens.add({
            targets: container,
            x: 520,
            duration: 350,
            ease: "Back.easeOut",
            onComplete: () => {

                this.scene.time.delayedCall(1800, () => {

                    this.scene.tweens.add({
                        targets: container,
                        x: 1080,
                        duration: 300,
                        ease: "Back.easeIn",
                        onComplete: () => {
                            container.destroy();
                        }
                    });

                });

            }
        });

    }

    update(){}

}