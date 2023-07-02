import { request } from "@/request";

//1. 获取交易页信息
export const reqTradeInfo = () => {
  return request.get("/api/order/auth/trade");
};

