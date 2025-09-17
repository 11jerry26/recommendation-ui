import request from "@/utils/request";

//获取用户信息
export const getUserInformation = (data:any) => {
    return request.post(`/user/getUserInfo`,data);
}