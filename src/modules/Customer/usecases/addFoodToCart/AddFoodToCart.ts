


/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Food } from "../../../Restaurant/domain/food";
import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository";
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors";
import { AddFoodToCartDTO } from "./AddFoodToCartDTO";

type Response = Either<
    Food404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class AddFoodToCart implements UseCase<AddFoodToCartDTO, Promise<Response>> {


    constructor(
        public foodRepo: IFoodRepository
    ) { }

    public async execute(req: AddFoodToCartDTO): Promise<Response> {
        try {
            
            let food: Food

            try {
                food = await this.foodRepo.findById(req.foodId)
            } catch (err) {
                return left(new Food404())
            }

            return right(Result.ok<void>())
        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }
    }
}