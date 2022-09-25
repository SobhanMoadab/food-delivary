/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { Product } from "../../domain/product";
import { ProductMapper } from "../../mappers/productMapper";
import { ICategoryRepository } from "../../repos/ICategoryRepository";
import { IProductRepository } from "../../repos/IProductRepository";
import { Category404 } from "../createCategory/CreateCategoryErrors";
import { CreateProductDTO } from "./CreateProductDTO";

type Response = Either<
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class CreateProductUseCase implements UseCase<CreateProductDTO, Promise<Response>> {


    constructor(
        public productRepository: IProductRepository,
        public categoryRepository: ICategoryRepository
    ) { }

    public async execute(req: CreateProductDTO): Promise<Response> {
        let category: Category

        const dto = {
            name: req.name,
            fee: req.fee,
            recipe: req.recipe,
            discountedFee: req.discountedFee,
            category: req.category
        }
        const productOrError = Product.create(dto)
        const dtoResult = Result.combine([productOrError])
        if (productOrError.isFailure) {
            return left(Result.fail<void>(dtoResult.getErrorValue())) as Response
        }
        const product = productOrError.getValue()

        try {
            try {
                category = await this.categoryRepository.findById(product.category)
            } catch (err) {
                return left(new Category404())
            }
            const toPers = ProductMapper.toPersistence(product)
            await this.productRepository.save(toPers)
            return right(Result.ok<void>())

        } catch (error) {
            return left(new UnexpectedError(error));
        }

    }
}