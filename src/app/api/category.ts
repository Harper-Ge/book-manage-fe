import qs from "qs";
import { CategoryQueryType, CategoryType } from "../type";
import request from "../utils/request";


export async function getCategoryList(params?: CategoryQueryType) {
    return request.get(`/api/categories?${qs.stringify(params)}`)
}

export async function postCategoryAdd(params: CategoryType) {
    return request.post("/api/categories", params)
}

export async function categoryDelete(id: string) {
    return request.delete(`/api/categories/${id}`)
}