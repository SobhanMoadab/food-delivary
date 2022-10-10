import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { RegisterDTO } from "./RegisterDTO";
import { DuplicateEmailError } from "./RegisterErrors";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController extends BaseController {
    private useCase: RegisterUseCase

    constructor(useCase: RegisterUseCase) {
        super()
        this.useCase = useCase
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: RegisterDTO = req.body as RegisterDTO;
        dto = {
            address: dto.address,
            email: dto.email,
            name: dto.name,
            phoneNumber: dto.phoneNumber
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isRight()) {
                return res.status(201).json({ status: 201, result: result.value.getValue() })

            } else if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    case DuplicateEmailError:
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