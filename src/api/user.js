import { request } from "@/request";

//1. 获取注册验证码
export const reqCode = (phone) => {
  return request.get(`/api/user/passport/sendCode/${phone}`);
};

//2. 注册
export const reqRegister = (userInfo) => {
  return request.post(`/api/user/passport/register`, userInfo);
};

//3. 登录
export const reqLogin = (userInfo) => {
  return request.post(`/api/user/passport/login`, userInfo);
};

//4. 获取用户信息
export const reqUserInfo = () => {
  return request.get(`/api/user/passport/auth/getUserInfo`);
};
