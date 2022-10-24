import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { FoodDTO } from "../../dto/FoodDTO";
import { IFoodRepository } from "../../repos/IFoodRepository";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { GetFoodsOfRestaurantDTO } from "./GetFoodsOfRestaurantDTO";

type Response = Either<
    Restaurant404 |
    UnexpectedError,
    Result<FoodDTO[]>
>

export class GetFoodsOfRestaurant implements UseCase<GetFoodsOfRestaurantDTO, Promise<Response>> {

    constructor(private foodRepo: IFoodRepository) { }

    public async execute(req: GetFoodsOfRestaurantDTO): Promise<Response> {


        const dto: GetFoodsOfRestaurantDTO = {
            restaurantId: req.restaurantId
        }

        try {

            const foods = await this.foodRepo.getFoodsByRestaurantId(dto.restaurantId)
            return right(Result.ok<FoodDTO[]>(foods))

        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }

}