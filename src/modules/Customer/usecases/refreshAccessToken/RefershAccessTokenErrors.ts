import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class RefreshTokenNotFound extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Refresh token is not found`
        } as UseCaseError)
    }
}
