export default class HUD {

    constructor(scene){
        this.scene = scene;

        this.likes = 0;
        this.comments = 0;
        this.gifts = 0;
        this.followers = 0;
    }

    preload(){}

    create(){

        this.container = this.scene.add.container(30,30);
        this.container.setDepth(200);

        const bg = this.scene.add.graphics();
        bg.fillStyle(0x000000,0.38);
        bg.fillRoundedRect(0,0,420,230,28);

        const border = this.scene.add.graphics();
        border.lineStyle(3,0x69d8ff,0.7);
        border.strokeRoundedRect(0,0,420,230,28);

        this.title = this.scene.add.text(25,20,"💎 CRISTAL LIVE GAME",{
            fontSize:"30px",
            color:"#ffffff",
            fontStyle:"bold"
        });

        this.likesText = this.makeText(25,70,"❤️",this.likes);
        this.commentsText = this.makeText(25,110,"💬",this.comments);
        this.giftsText = this.makeText(25,150,"🎁",this.gifts);
        this.followersText = this.makeText(25,190,"👤",this.followers);

        this.container.add([
            bg,
            border,
            this.title,
            this.likesText,
            this.commentsText,
            this.giftsText,
            this.followersText
        ]);
    }

    makeText(x,y,icon,value){
        return this.scene.add.text(x,y,`${icon}  ${value}`,{
            fontSize:"30px",
            color:"#ffffff",
            fontStyle:"bold"
        });
    }

    pulse(target){
        this.scene.tweens.add({
            targets: target,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 80,
            yoyo: true,
            ease: "Sine.easeInOut"
        });
    }

    addLike(){
        this.likes++;
        this.likesText.setText("❤️  " + this.likes);
        this.pulse(this.likesText);
    }

    addComment(){
        this.comments++;
        this.commentsText.setText("💬  " + this.comments);
        this.pulse(this.commentsText);
    }

    addGift(){
        this.gifts++;
        this.giftsText.setText("🎁  " + this.gifts);
        this.pulse(this.giftsText);
    }

    addFollower(){
        this.followers++;
        this.followersText.setText("👤  " + this.followers);
        this.pulse(this.followersText);
    }

    update(){}
}