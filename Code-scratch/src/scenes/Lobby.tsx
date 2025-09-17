import Phaser from "phaser";

export class Lobby extends Phaser.Scene {

    private score: number = 0;

    constructor(){
        super('Lobby');
    }

    init(data: { score: number }): void {
        this.score = data.score;
    }


    preload(): void {        
        this.load.image('background', 'assets/gameBackground.png');

    }

    create(): void {
        this.add.image(0,0,'background').setOrigin(0,0)

        this.add.text(this.scale.width / 2, this.scale.height / 2, 'Code-Scratch', {
            fontSize: '80px',
            color:'B05389'
        }).setOrigin(0.5)
        
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 180, 'Click para Jugar', {
            fontSize: '80px',
            color:'B05389',
            strokeThickness: 6
        }).setOrigin(0.5)

        this.input.once('pointerdown', () => {
            this.cameras.main.fadeOut(500);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                this.scene.start('GameScene', {score: this.score});  
            })
        })

        this.cameras.main.fadeIn(500);

    }

    update(): void {
        
    }




}