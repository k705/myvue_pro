import { request } from "@/request";
export const reqCategory1List = ()=>{
 return request.get(`/admin/product/getCategory1`)
}