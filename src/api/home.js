// 1.一级分类列表数据请求
import { request } from "@/request";
export const reqCategory1List = ()=>{
 return request.get(`/admin/product/getCategory1`)
}

// 2.根据一级分列列表id请求二级分类列表数据
export const reqCategory2List = (category1Id) => {
    return request.get(`/admin/product/getCategory2/${category1Id}`)
}