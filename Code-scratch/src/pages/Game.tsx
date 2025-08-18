import { useContext, useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { Start } from '../scenes/Start';
import { UserContext } from '../context/UserContext';
import getUser from '../api/GetUser';
import { Lobby } from '../scenes/Lobby';

const Game = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);


  const fetchUser = async() => {
    const userData = await getUser();
    console.log("mensaje desde game.tsx" + "" + userData);

    console.log("desde juego" + "" + "" + user.email);
    
    

  };

  useEffect(() => {
    fetchUser();
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1280,
      height: 720,
      backgroundColor: '#000000',
      parent: gameRef.current!,
      scene: [
        Lobby,
        Start
      ],
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