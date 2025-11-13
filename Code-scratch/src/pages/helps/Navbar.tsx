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
                id: '',
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

    return (
        <nav class="navbar navbar-expand-lg bg-dark navbar-dark">
            <div class="container-fluid">
                <Link class="navbar-brand"  href="" to="/">Code-Scratch</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" href="" to="/">Home</Link>
                        </li>
                        {user.email !=='' ? 
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {user.username}
                            </a>
                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="" onClick={handlerLogout}>LogOut</a></li>
                                </ul>
                        </li> 
                        : null}
                      
                    </ul>
                </div>
            </div>
        </nav>
    );
};
