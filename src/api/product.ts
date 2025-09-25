import request from "@/utils/request"

//获取商品列表
export const getProductList = (data:any) => {
    return request.post(`/product/getProductByPage`,data)
}

//根据商品id查询商品信息
export const getProductByIdAPI = (data:any) => {
    return request.post(`/product/getProductById`,data)
}

