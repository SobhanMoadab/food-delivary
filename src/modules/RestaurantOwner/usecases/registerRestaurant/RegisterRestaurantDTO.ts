import { Category } from "../../domain/category"

export interface RegisterRestaurantDTO {
    name: string
    city: string
    ownerName: string
    ownerSurname: string 
    phoneNumber: number
    category: string
}