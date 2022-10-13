/* eslint-disable @typescript-eslint/no-unused-vars */
import { Result } from "../../../../shared/core/Result";
import { UseCaseError } from "../../../../shared/core/UseCaseError";

export class Restaurant404 extends Result<UseCaseError> {
    constructor() {
        super(false, {
            message: `Restaurant does not exist!`
        } as UseCaseError)
    }
}