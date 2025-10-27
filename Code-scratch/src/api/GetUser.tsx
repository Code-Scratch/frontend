import { userApi } from "./apiBase/UserApi"


const user = async () => {
    const response = await userApi.get('/user');
    return response.data;
}

export default user;