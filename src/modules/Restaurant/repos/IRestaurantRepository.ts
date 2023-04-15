import { Restaurant } from "../domain/restaurant";
import { AllRestaurantDTO } from '../../Restaurant/usecases/getAllRestaurants/AllRestaurantDTO'
import { NearRestaurantsDTO } from "../../Customer/usecases/findNearRestaurant/FindNearRestaurantDTO";
export interface IRestaurantRepository {
    save(restaurant: Restaurant): Promise<void>
    findById(id: string): Promise<Restaurant>
    getAllRestaurants(dto: AllRestaurantDTO): Promise<Restaurant[]>
    getRestaurantsByCity(city: string): Promise<NearRestaurantsDTO>
    // delete(id: string): Promise<void>
    // getByCategory(id: string): Promise<Restaurant[]>
}