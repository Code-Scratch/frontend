import { useContext, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { UserContext } from '../context/UserContext';
import { Lobby } from '../scenes/Lobby';
import { GameScene } from '../scenes/GameScene';
import { GameOver} from'../scenes/GameOver';

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
        GameScene,
        GameOver
      ],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);
    game.scene.start("Lobby", { score: user.score, idUser: user.id});
    console.log("id de usuario desde Game.tsx" + "" + user.id);
    

    return () => {
      game.destroy(true); 
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={gameRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Game;