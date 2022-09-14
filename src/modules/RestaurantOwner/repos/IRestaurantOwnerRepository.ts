import { RestaurantOwner } from "../domain/restaurantOwner";

export interface IRestaurantRepository {
    save(restaurantOwner: RestaurantOwner): Promise<void>
    // getById(id: string): Promise<RestaurantOwner>
    // delete(id: string): Promise<void>
    // getByCategory(id: string): Promise<RestaurantOwner[]>
}