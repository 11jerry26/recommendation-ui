import axios from 'axios';
import router from '@/router';

import { showLoadingToast, showFailToast, showToast } from 'vant';
import Debounced from '@/utils/tool';

const showMsg = () => {
    showFailToast('接口请求失败')
};

const debouncedUse: Function = new Debounced().use(showMsg, 1000);
const request: any = {}

const Axios = axios.create({
    baseURL: 'http://localhost:8088',
})


Axios.interceptors.request.use((config: any) => {
    config.baseURL = 'http://localhost:8088';
    if (window.sessionStorage.getItem('token')) {
        config.headers['user-token'] = window.sessionStorage.getItem('token');
    }
    return config;
}, (err: any) => {
    debouncedUse();
    Promise.reject(err)
});

Axios.interceptors.response.use((res: any) => {
    // token过期(1001)、无权限(401)、使用平台时长超限(1012)，返回登录页
    if (res.data.code === 1001 || res.data.code === 401 || res.data.code === 1012) {
        if (res.data.msg) {
            showToast(res.data.msg);
        }
        router.replace('/');
    }

    return Promise.resolve(res.data)
}, (err: any) => {
    showLoadingToast({
        message: '加载中...',
        forbidClick: true,
    });
    debouncedUse();
    Promise.reject(err);
});

request.get = function (url: any, params: any) {
    return Axios({
        method: 'get',
        url,
        params
    });
}

request.delete = function (url: any, data: any) {
    return Axios({
        method: 'delete',
        url,
        data
    });
}

request.post = function (url: any, data: any) {
    return Axios({
        method: 'post',
        url,
        data
    });
}

request.put = function (url: any, data: any) {
    return Axios({
        method: 'put',
        url,
        data
    });
}
request.getFile = function (url: any, params: any) {
    return Axios({
        method: 'get',
        url: url,
        params: params,
        responseType: "blob"
    });
}
export default request;

