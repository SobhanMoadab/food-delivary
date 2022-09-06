import { AppError } from "../../../../shared/core/AppError";
import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace CreateCategoryErrors {

    export class DuplicateCategoryName extends Result<UseCaseError> {
        constructor(name: string) {
            super(false, {
                message: `The name ${name} is already chosen for a category!`
            } as UseCaseError)
        }
    }
}