/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { ObjectId } from "mongodb";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Category } from "../../domain/category";
import { CategoryId } from "../../domain/categoryId";
import { Food } from "../../domain/food";
import { Restaurant } from "../../domain/restaurant";
import { ProductMapper } from "../../mappers/foodMapper";
import { ICategoryRepository } from "../../repos/ICategoryRepository";
import { IProductRepository } from "../../repos/IProductRepository";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { Food404 } from "../createFood/CreateFoodErrors";
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { AddFoodToRestaurantDTO } from "./addFoodToRestaurantDTO";

type Response = Either<
    Food404 |
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


            return right(Result.ok<void>())

        } catch (error) {
            return left(new UnexpectedError(error));
        }

    }
}