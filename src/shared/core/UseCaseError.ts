interface IUseCaseError {
    message: string
}

export abstract class UseCaseError implements IUseCaseError {
    message: string
    constructor(message: string) {
        this.message = message
    }
}