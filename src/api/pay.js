import { request } from "@/request";

export const reqPayInfo = (orderId) => {
  return request.get(`/api/payment/weixin/createNative/${orderId}`);
};

export const reqPayStatus = (orderId) => {
  return request.get(`/api/payment/weixin/queryPayStatus/${orderId}`);
};
