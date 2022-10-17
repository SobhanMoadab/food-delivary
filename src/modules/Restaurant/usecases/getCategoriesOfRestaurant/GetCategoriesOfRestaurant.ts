import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { GetCategoriesOfRestaurantDTO, GetCategoriesOfRestaurantResponse } from "./GetCategoriesOfRestaurantDTO";

type Response = Either<
    Restaurant404 |
    UnexpectedError,
    Result<GetCategoriesOfRestaurantResponse>
>

export class GetCategoriesOfRestaurant implements UseCase<GetCategoriesOfRestaurantDTO, Promise<Response>> {

    constructor(private restaurantRepo: IRestaurantRepository) { }

    public async execute(req: GetCategoriesOfRestaurantDTO): Promise<Response> {

        let restaurant: Restaurant

        const dto: GetCategoriesOfRestaurantDTO = {
            restaurantId: req.restaurantId
        }
        try {
            try {
                restaurant = await this.restaurantRepo.findById(dto.restaurantId)
            } catch (err) {
                return left(new Restaurant404())
            }

            return right(Result.ok())

        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }

}