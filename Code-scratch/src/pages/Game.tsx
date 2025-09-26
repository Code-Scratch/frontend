import { useContext, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { UserContext } from '../context/UserContext';
import getUser from '../api/GetUser';
import { Lobby } from '../scenes/Lobby';
import { GameScene } from '../scenes/GameScene';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);
  console.log(user.score + "desde Game.tsx");
  


  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: '#000000',
      parent: gameRef.current!,
      physics: {
        default: 'matter',
        matter: {
          
        }
      },
      scene: [
        Lobby,
        GameScene
      ],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);
    game.scene.start("Lobby", { score: user?.score || 0 });

    return () => {
      game.destroy(true); 
    };
  }, [user]);

  return <div ref={gameRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Game;