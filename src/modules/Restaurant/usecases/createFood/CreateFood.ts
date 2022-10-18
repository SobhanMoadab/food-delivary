import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { CreateCategoryDTO } from "./CreateFoodDTO";
import { Category404, DuplicateCategoryName } from "./CreateFoodErrors";
import { ICategoryRepository } from '../../repos/ICategoryRepository'
import { Restaurant404 } from "../registerRestaurant/RegisterRestaurantErrors";
import { Restaurant } from "../../domain/restaurant";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";


type Response = Either<
    DuplicateCategoryName |
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class CreateCategoryUseCase implements UseCase<CreateCategoryDTO, Promise<Response>> {


    constructor(private categoryRepo: ICategoryRepository, private restaurantRepo: IRestaurantRepository) { }

    public async execute(req: CreateCategoryDTO): Promise<Response> {

        let restaurant: Restaurant
        let category: Category

        const dto = {
            name: req.name,
            restaurantId: req.restaurantId
        }

        try {
            try {
                restaurant = await this.restaurantRepo.findById(dto.restaurantId)
            } catch (err) {
                return left(new Restaurant404())
            }
            const categoryOrError = Category.create({
                name: dto.name,
                restaurantId: restaurant.restaurantId
            })
            if (categoryOrError.isFailure) {
                return left(categoryOrError)
            }

            category = categoryOrError.getValue()
            await this.categoryRepo.save(category)
            return right(Result.ok<void>())
        } catch (error) {
            return left(new UnexpectedError(error)) as Response;

        }

    }
}