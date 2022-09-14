import { Response } from "express"
import { UnexpectedError } from "../../../../shared/core/AppError"
import { BaseController } from "../../../../shared/infra/http/models/BaseController"
import { DecodedExpressRequest } from "../../../Customer/infra/http/models/DecodedExpressRequest"
import { CreateProductUseCase } from "./CreateProduct"
import { CreateProductDTO } from "./CreateProductDTO"
import { DuplicateProductName } from "./CreateProductErrors"


export class CreateProductController extends BaseController {

    constructor(private useCase: CreateProductUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: CreateProductDTO = req.body as CreateProductDTO

        dto = {
            name: dto.name,
            recipe: dto.recipe,
            category: dto.category,
            discountedFee: dto.discountedFee,
            fee: dto.fee
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case DuplicateProductName:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case UnexpectedError:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    default:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                }
            } else {
                return res.status(201).json({ status: 201, msg: 'Successful' })
            }
        } catch (err) {
            return res.status(500).json({ status: 500, msg: 'Something went wrong' })
        }
    }
}