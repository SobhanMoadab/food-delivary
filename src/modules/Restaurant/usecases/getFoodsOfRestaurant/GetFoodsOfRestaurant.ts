import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Food } from "../../domain/food";
import {  IFoodRepository } from "../../repos/IFoodRepository";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { GetFoodsOfRestaurantDTO } from "./GetFoodsOfRestaurantDTO";

type Response = Either<
    Restaurant404 |
    UnexpectedError,
    Result<Food[]>
>

export class GetFoodsOfRestaurant implements UseCase<GetFoodsOfRestaurantDTO, Promise<Response>> {

    constructor(private productRepo: IFoodRepository) { }

    public async execute(req: GetFoodsOfRestaurantDTO): Promise<Response> {


        const dto: GetFoodsOfRestaurantDTO = {
            restaurantId: req.restaurantId
        }

        try {
            const foods = await this.productRepo.getFoodsByRestaurantId(dto.restaurantId)
            return right(Result.ok<Food[]>(foods))

        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }

}