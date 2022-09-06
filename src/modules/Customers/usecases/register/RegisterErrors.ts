import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export namespace RegisterErrors {
    export class DuplicateEmailError extends Result<UseCaseError> {
        constructor(email: string) {
            super(false, {
                message: `The email ${email} associated for this account already exists`
            } as UseCaseError)
        }
    }

}