import { request } from "@/request";

//1. 获取交易页信息
export const reqTradeInfo = () => {
  return request.get("/api/order/auth/trade");
};

import { request, requestMock } from "@/request";


//2. 获取地址
export const reqAddress = () => {
  return requestMock.get(`/address/list`);
};


//3. 提交订单
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return request.post(
    `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
    tradeInfo
  );
};

