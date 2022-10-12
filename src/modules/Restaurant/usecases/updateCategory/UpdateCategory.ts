import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Category } from "../../domain/category";
import { ICategoryRepository } from "../../repos/ICategoryRepository";
import { Category404 } from "../createCategory/CreateCategoryErrors";
import { UpdateCategoryDTO } from "./UpdateCategoryDTO";




type Response = Either<
    Category404 |
    UnexpectedError,
    Result<void>
>
export class UpdateCategory implements UseCase<UpdateCategoryDTO, Promise<Response>> {

    constructor(
        public categoryRepository: ICategoryRepository
    ) { }
    public async execute(request: UpdateCategoryDTO): Promise<Response> {
        let category: Category

        const dto: UpdateCategoryDTO = {
            categoryId: request.categoryId
        }

        try {

            try {
                category = await this.categoryRepository.findById(dto.categoryId)

            } catch (err) {
                return left(new Category404())
            }


            return right(Result.ok<void>())
        } catch (err) {
            return left(new UnexpectedError(err))
        }
    }
}