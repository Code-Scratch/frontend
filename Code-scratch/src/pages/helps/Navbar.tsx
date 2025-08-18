import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { auth } from "../../fireBaseConfig/Config";
import type { User } from "../../model/User";

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handlerLogout = async() => {
        try {
            await auth.signOut();

            const userLogout: User = {
                email:'',
                username:'',
                score:0
            }
            setUser(userLogout);
            
            navigate('/');
        }
        catch(error) {
            console.log(error);
            
        }

    };

    const handlerGoHome = () =>{
        navigate('/')
    }




    return (
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                 <Link className="navbar-brand" to="/">Code-Scratch</Link>
                 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                         data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation"
                         onClick={handlerGoHome}>
                    <span class="navbar-toggler-icon"></span>
                </button>
                {user.email !=='' ?  <button type="button" class="btn btn-primary btn-sm" onClick={handlerLogout}> Logout </button> : <> </>}
                {user.email !=='' ?
                  <div>
                    <h4>{user.username}</h4>
                  </div>: <> </>}
                
                  
            </div>
            
            
        </nav>
    );
};
