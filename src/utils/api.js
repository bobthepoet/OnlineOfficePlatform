//为每个需要调用后端接口的事件统一判断请求成功与失败的处理模式

import axios from "axios";
import { Message } from 'element-ui'
import router from '../router'

// 请求拦截器
axios.interceptors.request.use(success => {
  // 判断是否存在tokenStr
  if (window.sessionStorage.getItem("tokenStr")) {
    // 若存在，之后每次请求将携带这个tokenStr,后端会有专门的tokenStr登录拦截器判断有tokenStr并且验证通过说明登录成功过了，后面的接口允许访问
    success.headers['Authorization'] = window.sessionStorage.getItem("tokenStr")
  }
  return success
}, error => {

});

// 响应拦截器
axios.interceptors.response.use(success => {
  // 业务逻辑错误
  if (success.status && success.status === 200) {
    if (success.data.code === 500 ||
      success.data.code === 401 ||
      success.data.code === 403) {
      Message.error({message: success.data.message})
      return
    }
    if(success.data.message) {
      Message.success({message: success.data.message})
    }
  }
  return success.data;
}, error => {
  if(error.response.code === 504 || error.response.code === 404) {
    Message.error({message: '服务器故障'})
  }else if (error.res.code === 403) {
    Message.error({message: '权限不足，请联系管理员！'})
  }else if (error.response.code === 401) {
    Message.error({message: '尚未登录，请登录！'})
    //跳转到登录页
    router.replace('/')
  }else {
    if(error.response.data.message) {
      Message.error({message: error.response.data.message})
    }else {
      Message.error({message: '未知错误！'})
    }
  }
  return;
});

//方便后续需要加前置路径
let baseUrl = '';

// 传送json格式的post请求
export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${baseUrl}${url}`,
    data: params
  })
};
// 传送json格式的get请求
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${baseUrl}${url}`,
    data: params
  })
};
// 传送json格式的put请求
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${baseUrl}${url}`,
    data: params
  })
};
// 传送json格式的delete请求
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    url: `${baseUrl}${url}`,
    params: params
  })
};
