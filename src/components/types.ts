export interface User {
    name: string,
    avatar: string,
    id: number
}

export interface initialstate {
    data: User[],
    loading: boolean,
    error: any
}