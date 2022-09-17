/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { NotFound404, UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { AllRestaurantDTO } from "./AllRestaurantDTO";

type Response = Either<
    NotFound404 |
    UnexpectedError,
    Result<Restaurant[]>
>


export class GetAllRestaurantsUseCase implements UseCase<AllRestaurantDTO, Promise<Response>> {

    constructor(
        public restaurantRepository: IRestaurantRepository
    ) { }

    public async execute(req: AllRestaurantDTO): Promise<Response> {

        const dto = {
            page: req.page,
            limit: req.limit,
        }

        try {
            const restaurants = await this.restaurantRepository.getAllRestaurants(dto)
            return right(Result.ok<Restaurant[]>(restaurants))
        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }

}