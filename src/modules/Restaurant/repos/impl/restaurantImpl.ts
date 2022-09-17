import { Model } from "mongoose";
import { m } from "vitest/dist/index-60e2a8e1";
import { Restaurant, RestaurantProps } from "../../domain/restaurant";
import { RestaurantMapper } from "../../mappers/restaurantMapper";
import { IRestaurantRepository } from "../IRestaurantRepository";


export class RestaurantRepository implements IRestaurantRepository {

    private _model: Model<RestaurantProps>

    constructor(schemaModel: Model<RestaurantProps>) {

        this._model = schemaModel;
    }

    async save(props: Restaurant): Promise<void> {
        const toPers = RestaurantMapper.toPersistence(props)
        await this._model.create(toPers)
        return
    }

    async findById(id: string): Promise<Restaurant> {
        const restaurant = await this._model.findById(id).lean().populate({
            path: 'categories',
            populate: { path: 'products' }
        })
        console.log({ 44444: restaurant })
        if (restaurant?.categories) console.log({ 55555: restaurant.categories })
        if (!restaurant) throw new Error()
        return RestaurantMapper.toDomain({ ...restaurant })
    }

    async getAllRestaurants(): Promise<Restaurant[]> {
        const restaurants = await this._model.find().lean()
        return restaurants.map((restaurant) => RestaurantMapper.toDomain(restaurant))
    }
}