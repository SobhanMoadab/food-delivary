import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { JWTToken } from "../../domain/Jwt";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { IAuthService } from "../../services/authService";
import { RefreshAccessTokenDTO } from "./RefershAccessTokenDTO";


type Response = Either<
    UnexpectedError |
    Result<any>,
    Result<JWTToken>
>

export class RefreshAccessToken implements UseCase<RefreshAccessTokenDTO, Promise<Response>> {
    constructor(
        public customerRepo: ICustomerRepository,
        public serviceRepo: IAuthService
    ) { }
    async execute(req: RefreshAccessTokenDTO): Promise<Response> {
        const { refreshToken } = req
        try {
            return right(Result.ok<any>())

        } catch (err) {
            return left(new UnexpectedError(err));
        }

    }
}