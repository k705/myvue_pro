import { request } from "@/request"

// 1.请求一级分类列表数据
export const reqCategory1List = () => {
    return request.get(`/admin/product/getCategory1`)
}

// 2. 请求二级列表数据
export const reqCategory2List = (category1Id) => {
    return  request.get(`/admin/product/getCategory2/${category1Id}`)
}