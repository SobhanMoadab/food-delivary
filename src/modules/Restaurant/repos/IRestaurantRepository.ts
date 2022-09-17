import { Restaurant } from "../domain/restaurant";
import { AllRestaurantDTO } from '../../Restaurant/usecases/getAllRestaurants/AllRestaurantDTO'
export interface IRestaurantRepository {
    save(restaurant: Restaurant): Promise<void>
    findById(id: string): Promise<Restaurant>
    getAllRestaurants(dto: AllRestaurantDTO): Promise<Restaurant[]>
    // delete(id: string): Promise<void>
    // getByCategory(id: string): Promise<Restaurant[]>
}