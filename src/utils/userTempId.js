import {nanoid} from "nanoid"
const userTempId = "userTempId"
export default function getUserTempId() {
    if (localStorage.getItem(userTempId)) {
            return localStorage.getItem(userTempId)
    } else {
        const id = nanoid()
        localStorage.getItem(userTempId, id) 
        return id
        }
    }