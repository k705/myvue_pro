import axios from "axios"
const request = axios.create({
    baseURL: process.env.VUE_APP_API1,
    timeout: 1000,
    headers: {}
})

// 配置请求拦截器
request.interceptors.request.use(
    (config) => {
    return config;
})
   
    // 配置响应拦截器
request.interceptors.response.use(
    (response) => {
        if (response.data.code === 200) {
            return response.data.data
        } else {
            Promise.reject(response.data)
        }
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default request