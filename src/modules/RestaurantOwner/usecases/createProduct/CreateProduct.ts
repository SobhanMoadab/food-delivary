import { AppError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Product } from "../../domain/Product/Product";
import { IProductRepository } from "../../repos/IProductRepository";
import { CreateProductDTO } from "./CreateProductDTO";


type Response = Either<
    // CreateProductErrors.DuplicateCategoryName |
    AppError.UnexpectedError |
    Result<any>,
    Result<void>
>


export class CreateProductUseCase implements UseCase<CreateProductDTO, Promise<Response>> {

    constructor(public productRepo: IProductRepository) { }

    public async execute(req: CreateProductDTO): Promise<Response> {

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
        try {
            const product = productOrError.getValue()
            await this.productRepo.save(product)
            return right(Result.ok<void>())
        } catch (error) {
            return left(new AppError.UnexpectedError(error)) as Response;

        }

    }
}