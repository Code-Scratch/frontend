import { userApi } from "./apiBase/UserApi"


const user = async () => {
    const response = await userApi.get('/user');
    console.log("mensaje desde el getUser.tsx" + "" + response.data);
    return response.data;
    

}

 export default user;