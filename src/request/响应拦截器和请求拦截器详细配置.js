import axios from "axios";

//创建一个axios实例(创建一个副本)
const request = axios.create({
  baseURL: "/api1",
  timeout: 10000,
  headers: {},
});


/* 
  请求拦截器的补充:
    1. 多个请求拦截器是逆序执行的
    2. 请求拦截器的失败处理函数 主要是 处理上一个请求拦截器的错误
    3. 如果给请求拦截器配置第三个参数配置对象,内部synchronous属性值为true,则代表当前拦截器的失败处理函数同步处理当前拦截器的错误




*/
//配置请求拦截器1
request.interceptors.request.use(
  (config) => {
    console.log("请求拦截器1");
    // throw new Error("我错了1");
    return config;
  },
  (error) => {
    console.log("请求拦截器报错了1");
    return Promise.reject(error);
  },
  {
    //请求拦截器接受第三个参数是一个配置项,配置项中有一个synchronous属性,代表同步捕获错误(当前请求拦截器的成功处理函数中如果抛出错误,则被当前请求拦截器失败函数处理)
    // synchronous: true,
  }
);

//配置请求拦截器2
request.interceptors.request.use(
  (config) => {
    console.log("请求拦截器2");
    throw new Error("我错了2");
    return config;
  },
  (error) => {
    console.log("请求拦截器报错了2");
    return Promise.reject(error);
  },
  {
    //请求拦截器接受第三个参数是一个配置项,配置项中有一个synchronous属性,代表同步捕获错误(当前请求拦截器的成功处理函数中如果抛出错误,则被当前请求拦截器失败函数处理)
    // synchronous: true,
  }
);

/* 
  比如现在请求成功了,但是结果有如下方式
  {
    code:200,
    data:"xxx",
    message:"成功"
  }

  {
    code:201,
    data:null,
    message:"密码错误"
  }

  {
    code:202,
    data:null,
    message:"验证码错误"
  }

*/
//配置响应拦截器
request.interceptors.response.use(
  (response) => {
    // return Promise.resolve(response.data);
    // return response.data;

    //响应拦截器中的完整配置
    //如果响应成功也要判断 是不是我们需要的内容,如果是则返回数据,如果不是则返回一个失败的promise
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return Promise.reject(response.data);
    }
  },
  (error) => {
    console.log("响应拦截器捕获错误了");
    return Promise.reject(error);
  }
);

export default request;

// promise.then(()=>{},()=>{}).then(()=>{},()=>{})

// arr = [请2,请1,响1,响2]
