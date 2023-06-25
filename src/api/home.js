import { request } from "@/request";

// 1.请求一级分类列表
export const reqCategory1List = () => {
    return request.get(`/admin/product/getCategory1`)
}