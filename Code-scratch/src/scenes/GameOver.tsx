import Phaser from "phaser";
import UpdatePb from "../api/UpdatePb";

export class GameOver extends Phaser.Scene {


    private score : number = 0;
    private pb : number = 0;
    private idUser : string = '';
    private hp : number = 0;

    constructor(){
        super('GameOver');

    };

    init(data: {score: number, pb: number, idUser: string, hp: number}){
        this.score = data.score;
        this.pb = data.pb;
        this.idUser = data.idUser;
        this.hp = data.hp;
    };

    preload(){

    };


    create(){
        this.add.image(0,0,'background').setOrigin(0,0);

        this.add.text(this.scale.width / 2, this.scale.height / 2 - 100, 'Game Over', {
            fontSize: '80px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 10
        }).setOrigin(0.5);
        
        this.add.text(this.scale.width / 2, this.scale.height / 2 + 60, `Final Score: ${this.score}`, {
            fontSize: '60px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 8
        }).setOrigin(0.5);
        
        if (this.score > this.pb) {
            (async () => {
                try {
                    await UpdatePb(this.score, this.idUser);
                    this.pb = this.score;
                } 
                catch (err) {
                    console.error("Error actualizando PB", err);
                }
            })();

            this.add.text(this.scale.width / 2, this.scale.height / 2 + 130, 'Lograste superar tu puntaje!!!', {
                fontSize: '60px',
                color: '#433D8C',
                stroke: '#ffffff',
                strokeThickness: 8
            }).setOrigin(0.5);
        };

        if(this.hp <= 0){
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 20, 'Lograste derrotar al gato malevolo!', {
                fontSize: '60px',
                color: '#433D8C',
                stroke: '#ffffff',
                strokeThickness: 8
            }).setOrigin(0.5);
        }
        
        else{
            this.add.text(this.scale.width / 2, this.scale.height / 2 - 20, 'Se te acabo el tiempo!', {
                fontSize: '60px',
                color: '#433D8C',
                stroke: '#ffffff',
                strokeThickness: 8
            }).setOrigin(0.5);
        };

        const replayButton = this.add.text(
            this.scale.width / 2,
            this.scale.height / 2 + 250,
            "Rejugar",
            {
                fontSize: "60px",
                color: "#ffffff",
                backgroundColor: "#433D8C",
                padding: { x: 20, y: 10 },
                stroke: "#000000",
                strokeThickness: 5,
            }
        ).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => replayButton.setStyle({ backgroundColor: "#5a4ad1" }))
        .on("pointerout", () => replayButton.setStyle({ backgroundColor: "#433D8C" }))
        .on("pointerdown", () => {
        this.sound.stopAll();
        this.scene.stop("GameScene");
        this.scene.start("Lobby", {score: this.pb, idUser : this.idUser});
        });


    };

    update(){

}; 

};



