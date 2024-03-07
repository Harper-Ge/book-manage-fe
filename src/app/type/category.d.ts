export interface CategoryQueryType {
    _id?: string;
    name?: string;
    level?: number;
    parentLevel?: number;
    current?: number;
    children?: CategoryType[];
    all?: boolean;
}

export interface CategoryType {
    name: string;
    level: 1 | 2;
    parent: CategoryType;
    _id?:number;
}