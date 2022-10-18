import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController"
import { DecodedExpressRequest } from "../../../Customer/infra/http/models/DecodedExpressRequest";
import { CreateCategoryUseCase } from "./CreateFood";
import { CreateCategoryDTO } from "./CreateFoodDTO";
import { Category404, DuplicateCategoryName } from "./CreateFoodErrors";


export class CreateCategoryController extends BaseController {

    constructor(private useCase: CreateCategoryUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: CreateCategoryDTO = req.body as CreateCategoryDTO

        dto = {
            name: dto.name,
            restaurantId: dto.restaurantId
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case DuplicateCategoryName:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case Category404:
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