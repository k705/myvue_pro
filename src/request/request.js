import axios from "axios"
// 环境变量对象
  console.log(process.env);
// 创建一个axios实例
const request = axios.create({
  baseURL: process.env.VUE_APP_API1,
  timeout: 1000,
  headers:{}
})

// 请求拦截器配置
request.interceptors.request.use((config) => { return config })

// 响应拦截器配置
request.interceptors.response.use((response) => {
  if (response.data.code === 200) {
    return response.data.data
  } else {
    return Promise.reject(response.data)
  }
}, (error) => {
  return Promise.reject(error)
})

export default request;