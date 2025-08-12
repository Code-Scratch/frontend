import { userApi } from "./apiBase/userApi"


const user = async () => {
    const response = await userApi.get('/user');
    console.log("mensaje desde el getUser.tsx" + "" + response.data);
    return response.data;
    

}

 export default user;