/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Food } from "../../domain/food";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { AddFoodToRestaurantDTO } from "./addFoodToRestaurantDTO";

type Response = Either<
    Restaurant404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class AddFoodToRestaurantUseCase implements UseCase<AddFoodToRestaurantDTO, Promise<Response>> {


    constructor(
        public restaurantRepo: IRestaurantRepository
    ) { }

    public async execute(req: AddFoodToRestaurantDTO): Promise<Response> {

        let restaurant: Restaurant
        let food: Food
        let dto = req as AddFoodToRestaurantDTO


        dto = {
            discountedFee: dto.discountedFee,
            fee: dto.fee,
            name: dto.name,
            recipe: dto.recipe,
            restaurantId: dto.restaurantId
        }
        try {

            try {
                restaurant = await this.restaurantRepo.findById(dto.restaurantId)
            } catch (err) {
                return left(new Restaurant404())
            }
            const foodOrError = Food.create({
                restaurantId: restaurant.restaurantId,
                fee: 333,
                name: 'a',
                recipe: 'a',
                discountedFee: 333
            })

            if (foodOrError.isFailure) {
                return left(foodOrError)
            }
            food = foodOrError.getValue()
            restaurant.addFood(food)
            await this.restaurantRepo.save(restaurant)
            return right(Result.ok<void>())

        } catch (error) {
            return left(new UnexpectedError(error));
        }

    }
}