import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Customer } from "../../domain/Customer";
import { JWTToken, RefreshToken } from "../../domain/jwt";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { IAuthService } from "../../services/authService";
import { RegisterDTO, RegisterResponse } from "./RegisterDTO";
import { RegisterErrors } from './RegisterErrors'

type Response = Either<
    RegisterErrors.DuplicateEmailError |
    UnexpectedError |
    Result<any>,
    Result<void>
>
// 



export class RegisterUseCase implements UseCase<RegisterDTO, Promise<Response>> {

    private customerRepository: ICustomerRepository
    private authService: IAuthService

    constructor(customerRepository: ICustomerRepository, authService: IAuthService) {
        this.customerRepository = customerRepository
        this.authService = authService
    }

    public async execute(req: RegisterDTO): Promise<Response> {

        const dto = {
            name: req.name,
            phoneNumber: req.phoneNumber,
            email: req.email,
            address: req.address
        }
        const customerOrError = Customer.create(dto)
        const dtoResult = Result.combine([customerOrError])

        if (customerOrError.isFailure) {
            return left(Result.fail<void>(dtoResult.getErrorValue())) as Response
        }

        try {
            const customer = customerOrError.getValue()
            // const userAlreadyExists = await this.customerRepository.exists(customer.email)
            // if (userAlreadyExists) {
            //     return left(
            //         new RegisterErrors.DuplicateEmailError(customer.email)
            //     ) as Response;
            // }
            await this.customerRepository.create(customer);

            const accessToken: JWTToken = this.authService.signJWT({
                email: customer.email,
                userId: customer.id
            })

            const refreshToken: RefreshToken = this.authService.createRefreshToken()

            customer.setAccessToken(accessToken, refreshToken);
            await this.authService.saveAuthenticatedCustomer(customer);

            return right(Result.ok<RegisterResponse>({
                accessToken, refreshToken
            })) as Response

        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }
    }
}