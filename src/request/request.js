import axios from "axios"
import store from "@/store"

const request = axios.create({
    baseURL: process.env.VUE_APP_API1,
    timeout: 10000,
    headers:{}
})

// 请求拦截器
request.interceptors.request.use((config) => {
    config.headers.userTempId = store.state.user.userTempId;
        return config 
})

// 响应拦截器
request.interceptors.response.use((response) => {
    if (response.data.code === 200) {
        return response.data.data
    }
    else {
        return Promise.reject(response.data)
    }
}, (error) => {
    return Promise.reject(error)
})

export default request