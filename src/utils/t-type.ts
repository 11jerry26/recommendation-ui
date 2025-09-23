// 请求返回接口
export interface Result {
  code: number;
  data: object | [] | string | any;
  msg: string;
}

//用户信息接口
export interface UserInfo {
  userId: number; //用户id
  account: string; //用户账号
  password: string; //用户密码
  userName?: string; //用户名
  phone?: string; //用户电话
  address?: string; //用户地址
  userRole: string; //用户角色
}

//商品信息接口
export interface Product {
  productId: number
  productCategory:string
  productSecondCategory:string
  productName:string
  fileName:string
  description:string
  price:number
  sellCount:number
}