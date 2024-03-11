import { BookType } from "./book";

export interface BorrowQueryType {
    current?: number,
    pageSize?: number,
    name?: string,
    author?: string,
    category?: string,
}

export interface BorrowType {
    book: BookType;
    borrowAt: number;
    backAt: number;
    //todo
    user: any;
}