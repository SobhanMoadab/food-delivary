import { Restaurant } from "../domain/restaurant";

export interface IRestaurantRepository {
    save(restaurant: Restaurant): Promise<void>
    findById(id: string): Promise<Restaurant>
    // delete(id: string): Promise<void>
    // getByCategory(id: string): Promise<Restaurant[]>
}