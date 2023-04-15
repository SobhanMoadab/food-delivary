export interface FindNearRestaurantDTO {
    city: string
}

export type NearRestaurantsDTO = Array<{
    name: string
    rating: number
}> 