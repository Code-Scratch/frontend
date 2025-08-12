import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Start } from '../scenes/Start';
import getUser from '../api/getUser';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);

  const fetchUser = async() => {
    const userData = await getUser();
    console.log("mensaje desde game.tsx" + "" + userData);
    

  };

  useEffect(() => {
    fetchUser();
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: '#000000',
      parent: gameRef.current!,
      scene: [Start],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true); 
    };
  }, []);

  return <div ref={gameRef} style={{ width: '100%', height: '100vh' }} />;
};

export default Game;