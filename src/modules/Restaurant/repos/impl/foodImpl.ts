import { Model } from "mongoose";
import { Food, FoodProps } from "../../domain/food";
import { FoodId } from "../../domain/foodId";
import { FoodDTO } from "../../dto/FoodDTO";
import { FoodMapper } from "../../mappers/foodMapper";
import { IFoodRepository } from "../IFoodRepository";


export class FoodRepository implements IFoodRepository {

    private _model: Model<FoodProps>

    constructor(schemaModel: Model<FoodProps>) {

        this._model = schemaModel;
    }

    async exists(productId: FoodId): Promise<boolean> {
        const id = productId.id.toString()
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }

    async saveBulk(foods: Food[]): Promise<void> {
        console.log({ 1111: foods })
        for (let food of foods) {
            await this.save(food)
        }
    }

    async save(food: Food): Promise<void> {
        const exists = await this.exists(food.foodId)
        const isNew = !exists
        const toPers = FoodMapper.toPersistence(food)
        if (isNew) {
            await this._model.create(toPers)
            // await this.saveProducts(category.products)
            return
        } else {
            await this._model.findByIdAndUpdate(food.foodId.id.toString(), toPers)
        }
    }
    async findById(id: string): Promise<Food> {
        const food = await this._model.findById(id)
        if (!food) throw new Error()
        return FoodMapper.toDomain({ ...food })
    }

    async getFoodsByRestaurantId(restaurantId: string): Promise<FoodDTO[]> {
        const foods = await this._model.find({ restaurantId }).lean()
        if (!foods) throw new Error()
        return foods.map(f => FoodMapper.toDTO(f))
    }
}