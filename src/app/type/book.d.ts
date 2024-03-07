export interface BookQueryType {
    current?: number,
    pageSize?: number,
    name?: string,
    author?: string,
    category?: string,
}

export interface BookType {
    name: string;
    author: string;
    category: string;
    publishAt: number;
    cover: string;
    description?: string;
    stock: number
}