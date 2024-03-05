import axios from "axios";
import qs from "qs";
import { BookQueryType } from "../type";
import request from "../utils/request";


export async function getBookList(params?: BookQueryType) {
    return request.get(`/api/books?${qs.stringify(params)}`)
}