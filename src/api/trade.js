import { request } from "@/request";

export const reqTradeInfo = () => {
  return request.get("/api/order/auth/trade");
};
