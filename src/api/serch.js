import { request } from "@/request"; 

export const reqSearchInfo = (data) => {
    return  quest.post(`/api/list`, data)
}