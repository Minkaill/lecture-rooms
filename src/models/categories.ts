export interface CategoryDTO {
    id: string,
    name: string,
    createdAt: Date
}

export interface ICategories {
    categories: CategoryDTO[]
}