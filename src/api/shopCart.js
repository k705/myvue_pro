import { request } from "@/request";
export const reqShopCartList = () => {
     return request.get(`api/cart/cartList`)
 }