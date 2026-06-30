export default class AudioService{

    constructor(scene){

        this.scene = scene;

    }

    create(){

        this.ambient=this.scene.sound.add("ambient",{loop:true,volume:0.15});

        this.pop=this.scene.sound.add("pop",{volume:0.40});
        this.comment=this.scene.sound.add("comment",{volume:0.45});
        this.follow=this.scene.sound.add("follow",{volume:0.45});
        this.gift=this.scene.sound.add("gift",{volume:0.50});
        this.coin=this.scene.sound.add("coin",{volume:0.45});
        this.treasure=this.scene.sound.add("treasure",{volume:0.55});
        this.galaxy=this.scene.sound.add("galaxy",{volume:0.70});
        this.whoosh=this.scene.sound.add("whoosh",{volume:0.55});

        this.ambient.play();

    }

    playLike(){

        this.pop.play();

    }

    playComment(){

        this.comment.play();

    }

    playFollow(){

        this.follow.play();

    }

    playGift(){

        this.gift.play();

    }

    playCoin(){

        this.coin.play();

    }

    playTreasure(){

        this.treasure.play();

    }

    playGalaxy(){

        this.galaxy.play();

    }

    playWhoosh(){

        this.whoosh.play();

    }

}