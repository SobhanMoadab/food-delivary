import { Model } from "mongoose";
import { Restaurant, RestaurantProps } from "../../domain/restaurant";
import { IRestaurantRepository } from "../IRestaurantRepository";


export class RestaurantRepository implements IRestaurantRepository {

    private _model: Model<RestaurantProps>

    constructor(schemaModel: Model<RestaurantProps>) {

        this._model = schemaModel;
    }
    async save(props: Restaurant): Promise<void> {
        await this._model.create({
            name: props.name,
            city: props.city,
            ownerName:props.ownerName,
            ownerSurname:props.ownerSurname
        })
        return
    }
}