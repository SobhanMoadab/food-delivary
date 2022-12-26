import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { ICartService } from "../../services/cartService";
import { RemoveFoodFromCartDTO } from "./RemoveFoodFromCartDTO";

type Response = Either<
    UnexpectedError |
    Result<any>,
    Result<void>
>
export class RemoveFoodFromCart implements UseCase<RemoveFoodFromCartDTO, Promise<Response>> {

    constructor(
        public cartService: ICartService
    ) { }

    public async execute(req: RemoveFoodFromCartDTO): Promise<Response> {
        try {
            try {
                await this.cartService.emptyCart(req.userId)
            } catch (err) {
                throw new Error()
            }
            return right(Result.ok<void>())
        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }
    }
}