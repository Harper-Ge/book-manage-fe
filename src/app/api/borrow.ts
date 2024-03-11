import axios from "axios";
import qs from "qs";
import { BorrowQueryType, BorrowType } from "../type";
import request from "../utils/request";


export async function getBorrowList(params?: BorrowQueryType) {
    return request.get(`/api/borrows?${qs.stringify(params)}`)
}

export async function postBorrowAdd(params: BorrowType) {
    return request.post("/api/borrows",params)
}

export async function borrowDelete(id: string) {
    return request.delete(`/api/borrows/${id}`)
}