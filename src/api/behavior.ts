import request from "@/utils/request"

//浏览商品
export const browseProductAPI = (data:any) => {
    return request.post(`/behavior/browseProduct`,data)
}