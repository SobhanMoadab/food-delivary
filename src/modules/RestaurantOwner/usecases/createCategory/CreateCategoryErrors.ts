import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";


export class DuplicateCategoryName extends Result<UseCaseError> {
    constructor(name: string) {
        super(false, {
            message: `The name ${name} is already chosen for a category!`
        } as UseCaseError)
    }
}
export class Category404 extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Category does not exist!`
        } as UseCaseError)
    }
}