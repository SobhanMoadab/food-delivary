import { Model } from "mongoose";
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
        const restaurant = await this._model.findById(id).populate({ path: 'categories' })
        console.log({ restaurant })
        if (!restaurant) throw new Error()
        return RestaurantMapper.toDomain({ ...restaurant })
    }
}