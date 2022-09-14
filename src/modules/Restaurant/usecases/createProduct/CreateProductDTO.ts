import { Category } from "../../domain/category"


export interface CreateProductDTO {
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
    category: string
}