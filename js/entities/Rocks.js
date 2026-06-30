export default class Rocks {

    constructor(scene){
        this.scene = scene;
    }

    preload(){
        this.scene.load.image("rockA","assets/rocks/rock_a.png");
        this.scene.load.image("rockB","assets/rocks/rock_b.png");
    }

    create(){

        const positions = [
            {x:120,y:1840,s:4},
            {x:280,y:1810,s:3},
            {x:520,y:1860,s:4.5},
            {x:780,y:1830,s:3.8},
            {x:980,y:1860,s:4.2}
        ];

        positions.forEach((p,i)=>{

            let rock = this.scene.add.image(
                p.x,
                p.y,
                i%2===0 ? "rockA" : "rockB"
            );

            rock.setScale(p.s);
            rock.setDepth(0.3);
        });
    }

    update(){}
}