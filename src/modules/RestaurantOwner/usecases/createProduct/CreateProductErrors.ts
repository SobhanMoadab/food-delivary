import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";
export class DuplicateProductName extends Result<UseCaseError> {
    constructor(name: string) {
        super(false, {
            message: `The name ${name} is already chosen for a category!`
        } as UseCaseError)
    }
}
export class Product404 extends Result<UseCaseError> {
    constructor(name: string) {
        super(false, {
            message: `Product does not exist!`
        } as UseCaseError)
    }
}