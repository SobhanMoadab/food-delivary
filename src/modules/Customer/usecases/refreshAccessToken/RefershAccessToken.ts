import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Customer } from "../../domain/Customer";
import { JWTToken } from "../../domain/Jwt";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { IAuthService } from "../../services/authService";
import { RefreshAccessTokenDTO } from "./RefershAccessTokenDTO";
import { RefreshTokenNotFound } from "./RefershAccessTokenErrors";


type Response = Either<
    UnexpectedError |
    Result<any>,
    Result<JWTToken>
>

export class RefreshAccessToken implements UseCase<RefreshAccessTokenDTO, Promise<Response>> {


    constructor(
        public customerRepo: ICustomerRepository,
        public authService: IAuthService
    ) { }

    async execute(req: RefreshAccessTokenDTO): Promise<Response> {
        let customerEmail: string
        let customer: Customer
        const { refreshToken } = req
        try {

            try {
                // get customer email from refresh token
                customerEmail = await this.authService.getEmailFromRefreshToken(refreshToken)
            } catch (err) {
                return left(new RefreshTokenNotFound())
            }

            try {
                // get customer  from customer name
                customer = await this.customerRepo.getCustomerByEmail(customerEmail)
            } catch (err) {
                return left(new RefreshTokenNotFound())
            }
            const accessToken: JWTToken = this.authService.signJWT({
                email: customer.email,
                userId: customer.id
            })
            customer.setAccessToken(accessToken, refreshToken)

            await this.authService.saveAuthenticatedCustomer(customer)
            return right(Result.ok<JWTToken>(accessToken))

        } catch (err) {
            return left(new UnexpectedError(err));
        }

    }
}