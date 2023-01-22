import { Model } from "mongoose";
import { Restaurant, RestaurantProps } from "../../domain/restaurant";
import { RestaurantId } from "../../domain/RestaurantId";
import { RestaurantMapper } from "../../mappers/restaurantMapper";
import { IFoodRepository } from "../IFoodRepository";
import { IRestaurantRepository } from "../IRestaurantRepository";


export class RestaurantRepository implements IRestaurantRepository {

    private _model: Model<RestaurantProps>

    constructor(
        schemaModel: Model<RestaurantProps>,
        public foodRepo: IFoodRepository
    ) {

        this._model = schemaModel;
    }

    async save(restaurant: Restaurant): Promise<void> {
        const exists = await this.exists(restaurant.restaurantId)
        const isNew = !exists
        const toPers = RestaurantMapper.toPersistence(restaurant)
        if (isNew) {
            await this._model.create(toPers)
            await this.foodRepo.saveBulk(restaurant.foods.getItems())
        }
        return
    }
    async exists(restaurantId: RestaurantId): Promise<boolean> {
        const id = restaurantId.id.toString()
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }


    async findById(id: string): Promise<Restaurant> {
        const restaurant = await this._model.findById(id).lean()
        if (!restaurant) throw new Error()
        return RestaurantMapper.toDomain({ ...restaurant })
    }

    async getAllRestaurants(): Promise<Restaurant[]> {
        const restaurants = await this._model.find().lean()
        return restaurants.map((restaurant) => RestaurantMapper.toDomain(restaurant))
    }
}