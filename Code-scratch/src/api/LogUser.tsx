import type { User } from "../model/User";
import type { UserLogin } from "../model/UserLogin";
import { userApi } from "./apiBase/userApi";


const LogUser = async(usuario : UserLogin) => {
    const response = await userApi.post('/user', {id: usuario.id, email: usuario.email, username: usuario.username});

    console.log(response);

    const usuarioBack: User = {
        email: response.data.user.email,
        username: response.data.user.username,
        score: response.data.user.score
    };
    console.log(usuarioBack);
    
    return usuarioBack;
    
};

export default LogUser;