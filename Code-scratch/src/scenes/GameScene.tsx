import Phaser from "phaser";

export class GameScene extends Phaser.Scene {

    private pb: number = 0; // puntos maximos del jugador
    private points: number = 0; // puntos actuales del jugador
    private hp: number = 200;   // vida del enemigo

    private grid: number[][] = []; // matriz del tablero
    private rows: number = 8;   // cantidad de filas
    private cols: number = 8;   // cantidad de columnas
    private gemTypes: string[] = ["diamanteRojo", "diamanteVerde", "diamanteAzul"]; // los assets

    private gemSize: number = 56; // px tamaño de cada gema

    private boardOffsetX: number = 750; // posicion X inicial del tablero
    private boardOffsetY: number = 170; // posicion Y inicial del tablero

    private selectedGem: Phaser.GameObjects.Image | null = null;
    private selectedRow: number = -1;
    private selectedCol: number = -1;

    private matched: boolean[][] = [];


    constructor(){
        super('GameScene');
    }

    init(data: { score: number }) {
        this.score = data.score;
        this.points = 0;
    }

    preload() : void {
        this.load.image('gameBackground', 'assets/gameBackground.png');

        this.load.image('diamanteRojo', 'assets/diamanteRojo.png');
        this.load.image('diamanteVerde', 'assets/diamanteVerde.png');
        this.load.image('diamanteAzul', 'assets/diamanteAzul.png');

        this.load.image('rexona', 'assets/desodorante.png')

        this.load.spritesheet('gato', 'assets/enemigoCat.png',{
          frameWidth: 71,
          frameHeight: 73
        });
    }

    create() : void {
        this.add.image(0,0, 'gameBackground').setOrigin(0,0)



        //presets del PB
        const scorePrefix = this.add.text(10,10, 'Player Best:', {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });

        this.scoreText = this.add.text(scorePrefix.x + scorePrefix.width, 10 , `${this.pb}`, {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        })

        //presets del score
        const pointsPrefix = this.add.text(40,40, 'Points:', {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });

        this.pointsText = this.add.text(scorePrefix.x + scorePrefix.width, 40 , `${this.points}`, {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        })


        //display para el enemigo
        
        this.add.image(320, 350, 'rexona').setDisplaySize(128,256);

        const hpPrefix = this.add.text(270, 500, 'HP:', {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        });
        
        /*
      this.anims.create({
        key: 'cat_idle',
        frames: this.anims.generateFrameNumbers('gato', { start: 0, end: 139 }), 
        frameRate: 7, // velocidad (frames por segundo)
        repeat: -1     // -1 = loop infinito
      });

      const enemy = this.add.sprite(320, 350, 'cat').setScale(3);
      enemy.play('cat_idle');
*/
        this.hpText = this.add.text(hpPrefix.x + hpPrefix.width, 500 , `${this.hp}`, {
            fontSize: '25px',
            color: '#433D8C',
            stroke: '#ffffff',
            strokeThickness: 6
        })
        

        //crear el tablero
        const graphics = this.add.graphics();
        graphics.lineStyle(4, 0xffffff, 1);
        graphics.strokeRect(
        this.boardOffsetX,
        this.boardOffsetY,
        this.cols * this.gemSize,
        this.rows * this.gemSize
        );

        this.createBoard();


        //prueba fisicas 
        /*
        this.matter.add.image(400, -100, 'diamanteRojo');
        this.matter.add.image(360, -600, 'diamanteVerde');
        this.matter.add.image(420, -900, 'diamanteAzul');

        this.matter.add.image(750,170, graphics, null, { isStatic: true } )

        */

        // prueba de agarre de gema
        
    
       
    }

    // Retorna una gema random en X e Y posicion
    private randomGem(row: any, col: any) : number {

        const gemType = Phaser.Math.Between(0, this.gemTypes.length - 1);

        const x = this.boardOffsetX + col * this.gemSize + this.gemSize / 2;
        const y = this.boardOffsetY + row * this.gemSize + this.gemSize / 2;

        const gem = this.add
          .image(x, y, this.gemTypes[gemType])
          .setDisplaySize(this.gemSize, this.gemSize)
          .setInteractive();

        this.input.setDraggable(gem);

        gem.setData("row", row);
        gem.setData("col", col);

        return gemType;

    }

    // Crea el tablero
    private createBoard(): void {
      for (let row = 0; row < this.rows; row++) {
        this.grid[row] = [];
        for (let col = 0; col < this.cols; col++) {
          const gemType = this.randomGem(row, col);
          this.grid[row][col] = gemType;
        }
      }

      this.input.on("dragstart", (_: any, gem: Phaser.GameObjects.Image) => {
        this.selectedGem = gem;
        this.selectedRow = gem.getData("row");
        this.selectedCol = gem.getData("col");
      });

      this.input.on(
        "drag",
        (_: any, gem: Phaser.GameObjects.Image, dragX: number, dragY: number) => {
          gem.x = dragX;
          gem.y = dragY;
        }
      );

      this.input.on("dragend", (_: any, gem: Phaser.GameObjects.Image) => {
        if (!this.selectedGem) return;

          const col = Math.floor((gem.x - this.boardOffsetX) / this.gemSize);
          const row = Math.floor((gem.y - this.boardOffsetY) / this.gemSize);

          const dRow = Math.abs(row - this.selectedRow);
          const dCol = Math.abs(col - this.selectedCol);

          if (
            row >= 0 &&
            row < this.rows &&
            col >= 0 &&
            col < this.cols &&
            ((dRow === 1 && dCol === 0) || (dRow === 0 && dCol === 1))
            ) {
            const otherGem = this.children.getChildren().find(
              (child: any) =>
              child.getData &&
              child.getData("row") === row &&
              child.getData("col") === col
            ) as Phaser.GameObjects.Image;

          if (otherGem) {
            // swap en grid
            const tempType = this.grid[row][col];
            this.grid[row][col] = this.grid[this.selectedRow][this.selectedCol];
            this.grid[this.selectedRow][this.selectedCol] = tempType;

            // actualizar datos de row/col en sprites
            otherGem.setData("row", this.selectedRow);
            otherGem.setData("col", this.selectedCol);
            gem.setData("row", row);
            gem.setData("col", col);

          // animacion del swap
          this.tweens.add({
            targets: otherGem,
            x: this.boardOffsetX + this.selectedCol * this.gemSize + this.gemSize / 2,
            y: this.boardOffsetY + this.selectedRow * this.gemSize + this.gemSize / 2,
            duration: 200,
          });

          this.tweens.add({
            targets: gem,
            x: this.boardOffsetX + col * this.gemSize + this.gemSize / 2,
            y: this.boardOffsetY + row * this.gemSize + this.gemSize / 2,
            duration: 200,
          });

          // Verificar si realmente hay match despues del swap
          if (!this.findMatches()) {
            // Si no hay match, revertir en grid
            this.grid[this.selectedRow][this.selectedCol] = this.grid[row][col];
            this.grid[row][col] = tempType;

            // Revertir row/col en sprites
            otherGem.setData("row", row);
            otherGem.setData("col", col);
            gem.setData("row", this.selectedRow);
            gem.setData("col", this.selectedCol);

            // Animacion de vuelta
            this.tweens.add({
              targets: otherGem,
              x: this.boardOffsetX + col * this.gemSize + this.gemSize / 2,
              y: this.boardOffsetY + row * this.gemSize + this.gemSize / 2,
              duration: 200,
            });

            this.tweens.add({
              targets: gem,
              x: this.boardOffsetX + this.selectedCol * this.gemSize + this.gemSize / 2,
              y: this.boardOffsetY + this.selectedRow * this.gemSize + this.gemSize / 2,
              duration: 200,
            });
          }
        }
      }
      else {
    // volver a posicion original
        this.tweens.add({
          targets: gem,
          x: this.boardOffsetX + this.selectedCol * this.gemSize + this.gemSize / 2,
          y: this.boardOffsetY + this.selectedRow * this.gemSize + this.gemSize / 2,
          duration: 200,
        });
     }

  this.selectedGem = null;
  this.selectedRow = -1;
  this.selectedCol = -1;
});

  }

    private findMatches(): boolean {
    let found = false;

    // Inicializar matched con la misma dimensión que grid
    this.matched = [];
    for (let row = 0; row < this.rows; row++) {
        this.matched[row] = [];
        for (let col = 0; col < this.cols; col++) {
            this.matched[row][col] = false;
        }
    }

    //  Buscar matches horizontales
    for (let row = 0; row < this.rows; row++) {
        for (let col = 0; col < this.cols - 2; col++) {
            const t = this.grid[row][col];
            if (
                t === this.grid[row][col + 1] &&
                t === this.grid[row][col + 2]
            ) {
                this.matched[row][col] = true;
                this.matched[row][col + 1] = true;
                this.matched[row][col + 2] = true;
                this.points += 10;
                this.pointsText.setText(this.points.toString(10));
                found = true;
            }
        }
    }

    //  Buscar matches verticales
    for (let col = 0; col < this.cols; col++) {
        for (let row = 0; row < this.rows - 2; row++) {
            const t = this.grid[row][col];
            if (
                t === this.grid[row + 1][col] &&
                t === this.grid[row + 2][col]
            ) {
                this.matched[row][col] = true;
                this.matched[row + 1][col] = true;
                this.matched[row + 2][col] = true;
                this.points += 10;
                this.pointsText.setText(this.points.toString(10));
                found = true;
            }
        }
    }
    console.log(found);
    console.log(this.points);
    
    
    return found;
}
/*
    private resolveMatches() : void {
        for (let x = 0; x < this.cols; x++) {
            let write_y = this.cols - 1;
            for (let y = this.cols; y < this.rows - 1; y-1) {
                if(!this.matched[y][x]){
                    this.grid[write_y][x] = this.grid[y][x];
                    write_y--;
                };
            };
            while(write_y >= 0) {
                this.grid[write_y][x] = this.randomGem(x,y)
                write_y--;
            };
        }
    }
*/

    private resolveMatches(): void {
      for (let col = 0; col < this.cols; col++) {
        let writeRow = this.rows - 1; // desde abajo

        for (let row = this.rows - 1; row >= 0; row--) {
          if (!this.matched[row][col]) {
          // mover gema hacia abajo en la grilla
          this.grid[writeRow][col] = this.grid[row][col];

          // mover el sprite tambien
          const gem = this.children.getChildren().find(
            (child: any) =>
              child.getData &&
              child.getData("row") === row &&
              child.getData("col") === col
          ) as Phaser.GameObjects.Image;

          if (gem) {
            gem.setData("row", writeRow);
            this.tweens.add({
              targets: gem,
              y: this.boardOffsetY + writeRow * this.gemSize + this.gemSize / 2,
              duration: 200,
            });
          }

        writeRow--;
      } 
          else {
            // si estaba matcheada, se destruye el sprite
            const gem = this.children.getChildren().find(
              (child: any) =>
                child.getData &&
                child.getData("row") === row &&
                child.getData("col") === col
            ) as Phaser.GameObjects.Image;

          if (gem) gem.destroy();
          }
      }

    // rellenar nuevas gemas arriba
    for (let newRow = writeRow; newRow >= 0; newRow--) {
      const gemType = this.randomGem(newRow, col);
      this.grid[newRow][col] = gemType;
    }
  }
}

    update(): void {
        if(this.findMatches()) {
            this.resolveMatches()
        }
    
    }
}