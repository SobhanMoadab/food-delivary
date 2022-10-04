import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { CreateCategoryDTO } from "./CreateCategoryDTO";
import { Category404, DuplicateCategoryName } from "./CreateCategoryErrors";
import { ICategoryRepository } from '../../repos/ICategoryRepository'
import { CategoryMapper } from "../../mappers/categoryMapper";


type Response = Either<
    DuplicateCategoryName |
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class CreateCategoryUseCase implements UseCase<CreateCategoryDTO, Promise<Response>> {


    constructor(private categoryRepository: ICategoryRepository) { }

    public async execute(req: CreateCategoryDTO): Promise<Response> {

        const dto = {
            name: req.name
        }
        const categoryOrError = Category.create(dto)
        const dtoResult = Result.combine([categoryOrError])

        if (categoryOrError.isFailure) {
            return left(Result.fail<void>(dtoResult.getErrorValue())) as Response
        }

        try {
            const category = categoryOrError.getValue()
            await this.categoryRepository.save(category)

            return right(Result.ok<void>())
        } catch (error) {
            return left(new UnexpectedError(error)) as Response;

        }

    }
}