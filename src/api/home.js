import { request ,requestMock     } from "@/request"

// 1.请求一级分类列表数据
export const reqCategory1List = () => {
    return request.get(`/admin/product/getCategory1`)
}

// 2. 根据一级分类列表id请求二级列表数据
export const reqCategory2List = (category1Id) => {
    return  request.get(`/admin/product/getCategory2/${category1Id}`)
}

// 3. 根据二级分类列表id请求三级列表数据
export const reqCategory3List = (category2Id) => {
    return request.get(`/admin/product/getCategory3/${category2Id}`)
}


//4. 请求List组件中的轮播图数据
export const reqBannerList = () => {
    return requestMock.get(`/banner/list`);
  };