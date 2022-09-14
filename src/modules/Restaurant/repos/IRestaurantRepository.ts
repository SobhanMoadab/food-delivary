import { Restaurant } from "../domain/restaurant";

export interface IRestaurantRepository {
    save(restaurant: Restaurant): Promise<void>
    // getById(id: string): Promise<RestaurantOwner>
    // delete(id: string): Promise<void>
    // getByCategory(id: string): Promise<RestaurantOwner[]>
}