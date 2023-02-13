import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class Order404 extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `The given orderId does not exists`
        } as UseCaseError)
    }
}
export class Customer404 extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `The given customerId does not exists`
        } as UseCaseError)
    }
}