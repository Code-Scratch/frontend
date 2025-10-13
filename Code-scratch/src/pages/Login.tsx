import { useContext, useEffect } from "react"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import type { UserLogin } from "../model/UserLogin";
import LogUser from "../api/LogUser";
import { UserContext } from "../context/UserContext";
import { auth, provider } from "../fireBaseConfig/Config";
import { FcGoogle } from "react-icons/fc";

export const Login = () => {
    const { setUser } = useContext(UserContext);
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


            console.log(logUser);
    
        }
        catch(error) {
            console.log(error);
            
        }
        
    };

    useEffect(() => {
        
    }, [])

    return (
            <div className="d-flex justify-content-center align-items-center vh-50">
                <div className="text-center">
                     <FcGoogle size={32} style={{ marginRight: "8px" }} />
                        <button type="button"className="btn btn-primary btn-lg" onClick={handlerButtonGoogle}>
                        Inicia Sesión con Google
                        </button>
                </div>
            </div>
        );

};