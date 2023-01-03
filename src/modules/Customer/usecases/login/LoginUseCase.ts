import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { LoginDTO } from "./LoginDTO";
import { CustomerDoesNotExists } from "./LoginErrors";

type Response = Either<
    UnexpectedError |
    Result<any>,
    Result<void>
>
export class LoginUseCase implements UseCase<LoginDTO, Promise<Response>> {

    constructor(public customerRepo: ICustomerRepository) { }

    async execute(req: LoginDTO): Promise<Response> {
        let customerExists: boolean

        const dto: LoginDTO = {
            email: req.email
        }

        try {
            try {
                customerExists = await this.customerRepo.exists(dto.email)
                if (!customerExists) throw new CustomerDoesNotExists()
            } catch (err) {
                return left(new CustomerDoesNotExists())
            }

            return right(Result.ok())
        } catch (err) {
            return left(new UnexpectedError('Something went wrong'))
        }
    }
}