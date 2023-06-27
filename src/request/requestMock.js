import axios from "axios";

console.log(process.env);
//创建实例
const request = axios.create({
  baseURL: "/",
  timeout: 10000,
  headers: {},
});

//请求拦截器
request.interceptors.request.use((config) => {
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //就算请求成功了,但是也不一定是我们想要的数据,之后后端返回的数据的code是200的时候才是我们想要的数据
    if (response.data.code === 200) {
      //直接把我们需要的数据返回即可
      return response.data.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
