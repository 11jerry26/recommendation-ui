import request from "@/utils/request"

//获取商品列表
export const getProductList = (data:any) => {
    return request.post(`/product/getProductByPage`,data)
}