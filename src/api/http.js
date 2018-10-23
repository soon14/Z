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

// import { Loading } from 'element-ui'
// let loading;//定义loading变量
// function startLoading() {//使用Element loading-start 方法
//     loading = Loading.service({
//         lock: true,
//         text: '拼命加载中...',
//         customClass:"bgimg",
//         target: document.querySelector('.Router')//设置加载动画区域
//     })
// }
// function endLoading() {    //使用Element loading-close 方法
//     loading.close()
// }
// //可能会同一时刻多次请求
// let LoadingRequestCount = 0
// function showLoading() {
//     if (LoadingRequestCount === 0) {
//         startLoading()
//     }
//     LoadingRequestCount++
// }
// function HideLoading() {
//     if (LoadingRequestCount <= 0) return
//     LoadingRequestCount--
//     if (LoadingRequestCount === 0) {
//         endLoading()
//     }
// }
// let newDate;
// let oldDate;
// let API_URL=process.env.API_URL
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
 
axios.interceptors.request.use(
    config => {
    	config.headers.req_type = 'ajax';
        if (store.state.common.token) {
            config.headers.Authorization = `${store.state.common.token}`;
        }
        // newDate=new Date()
        // showLoading()//加载动画
      
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

                // oldDate = new Date()
                // let time = oldDate.getTime() - newDate.getTime()
                // console.log(time)
                // if (time < 500) time = 500
                // setTimeout(() => {
                //     HideLoading()//关闭动画
                // }, time)
            return response;
            
        },
        error => {
            //alert(JSON.stringify(error));
            if (error.response) {
                // if(error.response.data.errorCode==null){
                //     store.commit(types.LOGOUT);
                //     sessionStorage.removeItem('getSystem');
                //     sessionStorage.removeItem('isselect');
                //     sessionStorage.removeItem('storelogo');
                //     router.replace({
                //         path: '/loginIn',
                //         query: {redirect: router.currentRoute.fullPath}
                //     })
                // }else{
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
                // }
               

            }
             //console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
            try{
              return Promise.reject(error.response.data)
            }catch(e){}

        });
export default axios;
