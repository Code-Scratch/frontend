import { UpdateContextUser } from "../pages/helps/UpdateContextUser";
import { userApi } from "./apiBase/UserApi"

const UpdatePb = async(newPb: number, idUser: string) => {

    const response = await userApi.put('/user/update', {id: idUser , pb: newPb});

    UpdateContextUser(response.data.user);

    return response.data;
}

export default UpdatePb;