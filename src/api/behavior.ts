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