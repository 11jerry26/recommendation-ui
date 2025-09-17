import request from "@/utils/request";
// 登录
export const userLogin = (data: any) => {
    return request.post(`/user/login`,data);
};
