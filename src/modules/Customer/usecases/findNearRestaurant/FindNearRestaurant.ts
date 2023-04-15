import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Restaurant } from "../../../Restaurant/domain/restaurant";
import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository";
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors";
import { FindNearRestaurantDTO, NearRestaurantsDTO } from "./FindNearRestaurantDTO";

type Response = Either<Restaurant404 | UnexpectedError , Result<NearRestaurantsDTO> >

export class FindNearRestaurant implements UseCase<FindNearRestaurantDTO, Promise<Response>> {
    
    constructor(public restaurantRepo: IRestaurantRepository){

    }
    async execute(req: FindNearRestaurantDTO): Promise<Response> {

        try {
            let nearRestaurants: NearRestaurantsDTO
            try {
                nearRestaurants =  await this.restaurantRepo.getRestaurantsByCity(req.city)
                
            } catch (err) {
                return left(new Restaurant404())
            }
            return right(Result.ok(nearRestaurants))
        } catch (err) {
            console.log({ err })
            return left(new UnexpectedError('Something went wrong'))
        }
    }
}