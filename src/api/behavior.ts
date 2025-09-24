import request from "@/utils/request"

//浏览商品
export const browseProductAPI = (data:any) => {
    return request.post(`/behavior/browseProduct`,data)
}

//收藏/取消收藏商品
export const handleCollectAPI = (data:any) => {
    return request.post(`/behavior/collectProduct`,data)
}

//查询是否已收藏
export const searchCollectStatus = (data:any) => {
    return request.post(`/behavior/searchCollectStatus`,data)
}

//加入购物车
export const addCartAPI = (data:any) => {
    return request.post(`/behavior/addCart`,data)
}

//查询购物车商品
export const getAllCartProduct = (data:any) => {
    return request.post(`/behavior/getAllCartProduct`,data)
}

//修改购物车商品数量
export const changeCartProductCount = (data:any) => {
    return request.post(`/behavior/changeCartProductCount`,data)
}

//删除购物车商品
export const deleteCartProduct= (data:any) => {
    return request.post(`/behavior/deleteCartProduct`,data)
}

//购买购物车商品
export const purchaseCartProduct = (data:any) => {
    return request.post(`/behavior/purchaseCartProduct`,data)
}