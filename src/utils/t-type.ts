// 请求返回接口
export interface Result {
  code: number;
  data: object | [] | string | any;
  msg: string;
}