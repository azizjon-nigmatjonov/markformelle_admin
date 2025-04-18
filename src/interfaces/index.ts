export interface IFilterParams {
    page: number;
    perPage: number;
    q?: string
    search?: string
    title?: string
    edit?: boolean
    currentIndex?: number
    [key: string]: any
}