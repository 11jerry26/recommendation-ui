import request from "@/utils/request"

//查询用户收藏
export const getMyCollection = (data:any) => {
    return request.post(`/behavior/getMyCollection`,data)
}

//查询用户订单
export const getUserOrder = (data:any) => {
    return request.post(`/behavior/getMyOrder`,data)
}

//删除用户订单
export const deleteUserOrder = (data:any) => {
    return request.post(`/behavior/deleteUserOrder`,data)
}