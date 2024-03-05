import axios from "axios";
import qs from "qs";
import { BookQueryType, BookType } from "../type";
import request from "../utils/request";


export async function getBookList(params?: BookQueryType) {
    return request.get(`/api/books?${qs.stringify(params)}`)
}

export async function postBookAdd(params: BookType) {
    return request.post("/api/books",params)
}