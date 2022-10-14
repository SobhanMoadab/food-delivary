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
import { AddProductToRestaurantDTO } from "./addProductToCategoryDTO";

type Response = Either<
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class AddProductToRestaurantUseCase implements UseCase<AddProductToRestaurantDTO, Promise<Response>> {


    constructor(
        public categoryRepository: ICategoryRepository,
        public restaurantRepository: IRestaurantRepository,

    ) { }

    public async execute(req: AddProductToRestaurantDTO): Promise<Response> {

        let category: Category

        const dto: AddProductToRestaurantDTO = {
            discountedFee: req.discountedFee,
            fee: req.fee,
            name: req.name,
            recipe: req.recipe,
            categoryId: req.categoryId
        }
        try {

            category = await this.categoryRepository.findById(dto.categoryId)

        } catch (err) {
            return left(new Category404())
        }

        const productOrError = Product.create({
            categoryId: category.categoryId,
            fee: dto.fee,
            name: dto.name,
            recipe: dto.recipe,
            discountedFee: dto.discountedFee
        })

        if (productOrError.isFailure) {
            return left(productOrError)
        }

        const product = productOrError.getValue()

        try {
            category.addProduct(product)
            await this.categoryRepository.save(category)
            return right(Result.ok<void>())

        } catch (error) {
            return left(new UnexpectedError(error));
        }

    }
}