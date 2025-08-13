import { useContext, useEffect, useState } from "react"
import {auth, provider} from "../fireBaseConfig/config"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import type { UserLogin } from "../model/UserLogin";
import LogUser from "../api/LogUser";
import { UserContext } from "../context/UserContext";

export const Login = () => {
    const [score, setScore] = useState<number>(0);
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();

    const handlerButtonGoogle = async () => {
        try {
            const userCredential = await signInWithPopup(auth, provider);

            if(!userCredential.user) throw new Error("Error al loguear con google");

            const usuario: UserLogin = {
                id: userCredential.user.uid,
                email: userCredential.user.email,
                username: userCredential.user.email?.split("@")[0]
            };

            const logUser = await LogUser(usuario);

            setUser(logUser);
            navigate('/');

            setScore(logUser.score);

            console.log(logUser);
    
        }
        catch(error) {
            console.log(error);
            
        }
        
    };

    useEffect(() => {
        
    }, [])

    return (
        <div>
            {score?
            /*navigate("/")*/ <div > <h2> SCORE</h2> <h1> {score} </h1>
            </div> 
            : <button onClick={handlerButtonGoogle}>
                Inicia Sesion con Google
                </button> }
        </div>
    );

};