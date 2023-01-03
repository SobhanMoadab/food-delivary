import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class CustomerDoesNotExists extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `The given number does not exists`
        } as UseCaseError)
    }
}
