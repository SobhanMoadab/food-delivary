import { Category } from "../../domain/Category/Category"


export interface CreateProductDTO {
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    category: Category
}