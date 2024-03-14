import qs from "qs";
import { UserQueryType, UserType } from "../type";
import request from "../utils/request";


export async function getUserList(params?: UserQueryType) {
    return request.get(`/api/users?${qs.stringify(params)}`)
}

export async function postUserAdd(params: UserType) {
    return request.post("/api/users", params)
}

export async function UserDelete(id: string) {
    return request.delete(`/api/users/${id}`)
}

export async function userUpdate(params: UserType){
    return request.put(`/api/users/`, params)
}

export async function getUserDetail(id: string) {
    return request.get(`/api/users/${id}`)
}

export async function login(params: Pick<UserType, "name"|"password">) {
    return request.post("/api/login", params)
}