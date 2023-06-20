import axios from "axios"

// 创建一个axios实例
const request = axios.create({
  baseURL: "/",
  timeout: 1000,
  headers:{}
})

// 请求拦截器配置
request.interceptors.request.use((config) => { return config })

// 响应拦截器配置
request.interceptors.response.use((response) => {
  if (response.data.code === 200) {
    return response.data
  } else {
    return Promise.reject(response.data)
  }
}, (err) => {
  return Promise.reject(error)
})

export default request;