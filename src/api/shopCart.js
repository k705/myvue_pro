import { request } from "@/request";    

export const reqShopCartList = () => {
    return request.get(`/api/cart/cartList`)
}


export const reqCheckCart = (skuID, isChecked) => {
    return request.get(`/api/cart/checkCart/${skuID}/${isChecked}`);
  };
  

  export const reqDeleteCart = (skuId) => {
    return request.delete(`/api/cart/deleteCart/${skuId}`);
  };
  

  export const reqBatchCheckCart = (isChecked, skuIdList) => {
    return request.post(`/api/cart/batchCheckCart/${isChecked}`, skuIdList);
  };
  

  export const reqBatchDelete = (skuIdList) => {
    return request.post(`/api/cart/batchDeleteCart`, skuIdList);
  };
  