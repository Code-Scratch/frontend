import type { User } from "../model/User";
import type { UserLogin } from "../model/UserLogin";
import { userApi } from "./apiBase/UserApi";


const LogUser = async(usuario : UserLogin) => {
    const response = await userApi.post('/user', {id: usuario.id, email: usuario.email, username: usuario.username});

    const usuarioBack: User = {
        id: response.data.user.id,
        email: response.data.user.email,
        username: response.data.user.username,
        score: response.data.user.score
    };
    
    return usuarioBack;
    
};

export default LogUser;