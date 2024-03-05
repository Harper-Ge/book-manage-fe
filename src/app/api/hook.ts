import axios from "axios";
import qs from "qs";
import { BookQueryType } from "../type";


export async function getBookList(params?: BookQueryType) {
    const res = await axios.get(`/api/books?${qs.stringify(params)}`)
    console.log(res.data);
    
    return res.data;
}