import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { RefreshAccessToken } from "./RefershAccessToken";
import { RefreshAccessTokenDTO } from "./RefershAccessTokenDTO";
import { RefreshTokenNotFound } from "./RefershAccessTokenErrors";


export class RefreshAccessTokenController extends BaseController {
    private useCase: RefreshAccessToken

    constructor(useCase: RefreshAccessToken) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        const dto: RefreshAccessTokenDTO = req.body as RefreshAccessTokenDTO;

        try {
            const result = await this.useCase.execute(dto)
            if (result.isRight()) {
                return res.status(201).json({ status: 201, result: result.value.getValue() })

            } else if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case RefreshTokenNotFound:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case UnexpectedError:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    default:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                }
            }

        } catch (err) {
            return res.status(500).json({ status: 500, msg: 'Something went wrong' })
        }
    }
}