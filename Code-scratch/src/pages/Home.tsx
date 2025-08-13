import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


export const Home = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const handlerButtonLogin = () => {
        navigate('/login');
    };
    const handlerButtonLogout = () =>{
        
    };

    const handlerButtonPlay = () =>{
        navigate('/game');
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <div className="d-flex gap-4">
                    <div className="card" style={{ width: '19rem' }}>
                        <div className="card-body">
                            <h5 className="card-title">Logueate</h5>
                            <p className="card-text">Bienvenido a Code-Scratch! Logueate para continuar</p>
                            <button type="button" className="btn btn-primary btn-lg" onClick={handlerButtonLogin}>
                                Loguearme
                            </button>
                            <button type="button" className="btn btn-primary btn-lg" onClick={handlerButtonLogout}>
                                Logout
                            </button>
                            <button type="button" className="btn btn-primary btn-lg" onClick={handlerButtonPlay}>
                                Play
                            </button>
                            <div > <h2> SCORE</h2> <h1> {user.score} </h1>
            </div> 
                        </div>
                    </div>      
                </div>  
        </div>  
        
    )
};