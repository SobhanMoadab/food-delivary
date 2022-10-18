import { NotFound404, UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { GetRestaurantByIdDTO } from "./GetRestaurantByIdDTO";


type Response = Either<
    NotFound404 |
    UnexpectedError,
    Result<Restaurant>
>


export class GetRestaurantById implements UseCase<GetRestaurantByIdDTO, Promise<Response>> {

    constructor(public restaurantRepo: IRestaurantRepository) { }

    public async execute(req: GetRestaurantByIdDTO): Promise<Response> {
        let restaurant: Restaurant
        try {
            try {
                restaurant = await this.restaurantRepo.findById(req.restaurantId)
            } catch (err) {
                return left(new NotFound404())
            }
            return right(Result.ok<Restaurant>(restaurant))
        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }
}