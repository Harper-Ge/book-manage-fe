export interface BookQueryType {
    current?: number;
    pageSize?: number;
    name?: string;
    author?: string;
    category?: string;
    all?: boolean;
}

export interface BookType {
    _id?: string;
    name: string;
    author: string;
    category: string;
    publishAt: number;
    cover: string;
    description?: string;
    stock: number
}