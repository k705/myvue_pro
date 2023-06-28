import {request} from "@/request";

export const reqSearchInfo = (data) => {
    return request.post(`/api/list`,data)
}