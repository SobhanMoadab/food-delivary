import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { RegisterDTO } from "./RegisterDTO";
import { RegisterErrors } from "./RegisterErrors";
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
            const token = result.value.getValue()
            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case RegisterErrors.DuplicateEmailError:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case UnexpectedError:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    default:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                }
            } else {
                return res.status(201).json({ status: 201, result: token })
            }

        } catch (err) {
            return res.status(500).json({ status: 500, msg: 'Something went wrong' })
        }
    }
}