import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class RestaurantNotFoundError extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Restaurant not found!`
        } as UseCaseError)
    }
}


export class CartIsEmpty extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Cart is empty`
        } as UseCaseError)
    }
}
