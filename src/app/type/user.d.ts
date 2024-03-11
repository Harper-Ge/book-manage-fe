export interface UserQueryType {
    name?: string;
    status?: number;
    pageSize?: number;
    current?: number;
}

export interface UserType {
    name: string;
    status: "on" | "off";
    nickName: string;
    _id?:string;
}