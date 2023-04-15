import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors";
import { FindNearRestaurantDTO, RestaurantsDTO } from "./FindNearRestaurantDTO";

type Response = Either<Restaurant404 | UnexpectedError , Result<RestaurantsDTO> >

export class FindNearRestaurant implements UseCase<FindNearRestaurantDTO, Promise<Response>> {
    // constructor(){

    // }
    async execute(request: FindNearRestaurantDTO): Promise<Response> {
        try {
            return right(Result.ok())
        } catch (err) {
            return left(new UnexpectedError('Something went wrong'))
        }
    }
}