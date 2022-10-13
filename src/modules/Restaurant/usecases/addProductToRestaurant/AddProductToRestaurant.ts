/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { ObjectId } from "mongodb";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Category } from "../../domain/category";
import { CategoryId } from "../../domain/categoryId";
import { Product } from "../../domain/product";
import { Restaurant } from "../../domain/restaurant";
import { ProductMapper } from "../../mappers/productMapper";
import { ICategoryRepository } from "../../repos/ICategoryRepository";
import { IProductRepository } from "../../repos/IProductRepository";
import { IRestaurantRepository } from "../../repos/IRestaurantRepository";
import { Category404 } from "../createCategory/CreateCategoryErrors";
import { AddProductToRestaurantUseCaseDTO } from "./AddProductToRestaurantDTO";

type Response = Either<
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class AddProductToRestaurantUseCase implements UseCase<AddProductToRestaurantUseCaseDTO, Promise<Response>> {


    constructor(
        public categoryRepository: ICategoryRepository,
        public restaurantRepository: IRestaurantRepository,

    ) { }

    public async execute(req: AddProductToRestaurantUseCaseDTO): Promise<Response> {

        let category: Category
        let restaurant: Restaurant

        try {

            [category, restaurant] = await Promise.all([
                this.categoryRepository.findById(req.categoryId),
                this.restaurantRepository.findById(req.restaurantId)
            ])

        } catch (err) {
            return left(new Category404())
        }

        const dto = {
            name: req.name,
            fee: req.fee,
            recipe: req.recipe,
            discountedFee: req.discountedFee,
            categoryId: category.categoryId
        }

        const productOrError = Product.create(dto)
        const dtoResult = Result.combine([productOrError])

        if (productOrError.isFailure) {
            return left(Result.fail<void>(dtoResult.getErrorValue())) as Response
        }

        const product = productOrError.getValue()

        try {
            restaurant.addProduct(product)
            await this.restaurantRepository.save(restaurant)
            return right(Result.ok<void>())

        } catch (error) {
            return left(new UnexpectedError(error));
        }

    }
}