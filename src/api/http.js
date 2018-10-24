/**
 * http配置
 */
import Vue from 'vue'
import axios from 'axios'
import store from '@/store/index'
import * as types from '@/store/types'
import router from '@/router/index'
import Qs from 'qs'
import { Notification } from 'element-ui'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.baseURL = types.API_URL;
axios.defaults.responseType= 'json';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers['Access-Control-Allow-Origin'] ='*';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// axios.defaults.transformRequest = [function (data) {
// 　　data = Qs.stringify(data);
// console.log(data,"0");
// return data;
// }];
//axios.defaults.data={_t: '1'};
axios.defaults.transformResponse = [function (data) {
   // 这里提前处理返回的数
   return data;
 }];
 axios.defaults.onUploadProgress= [function(progressEvent) {}];
 axios.defaults.onDownloadProgress= [function(progressEvent) {}];
 //拦截器
axios.interceptors.request.use(
    config => {
    	config.headers.req_type = 'ajax';
        if (store.state.common.token) {
            config.headers.Authorization = `${store.state.common.token}`;
        }
        return config;
    },
    err => {
        // console.log(JSON.stringify(err));
        return Promise.reject(err);
    });
// http response 响应
axios.interceptors.response.use(
        response => {
            if(response.data!=null && response.data.status==403 ){
                   Notification({
                        title:'error',//
                        message: response.data.errorMessage,
                        type: 'warning',
                        position: 'bottom-right'
                    });
                }
            return response;
        },error => {
           try {
                if (error.response) {
                    switch (error.response.status) {
                        case 403:
                            // 403 清除token信息并跳转到登录页面
                            store.commit(types.LOGOUT);
                            sessionStorage.removeItem('getSystem');
                            sessionStorage.removeItem('isselect');
                            sessionStorage.removeItem('storelogo');
                            router.replace({
                                path: '/loginIn',
                                query: {redirect: router.currentRoute.fullPath}
                            })
                    }
                }
                return Promise.reject(error.response.data)
            }
            catch (e) {
     
            }
        });
export default axios;
