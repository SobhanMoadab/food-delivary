import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Food } from "../../domain/food";
import { IProductRepository } from "../../repos/IProductRepository";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { GetFoodsOfRestaurantDTO } from "./GetFoodsOfRestaurantDTO";

type Response = Either<
    Restaurant404 |
    UnexpectedError,
    Result<Food[]>
>

export class GetFoodsOfRestaurant implements UseCase<GetFoodsOfRestaurantDTO, Promise<Response>> {

    constructor(private productRepo: IProductRepository) { }

    public async execute(req: GetFoodsOfRestaurantDTO): Promise<Response> {


        const dto: GetFoodsOfRestaurantDTO = {
            restaurantId: req.restaurantId
        }

        try {
            const foods = await this.productRepo.getProductsByRestaurantId(dto.restaurantId)
            return right(Result.ok<Food[]>(foods))

        } catch (err) {
            return left(new UnexpectedError(err))
        }

    }

}