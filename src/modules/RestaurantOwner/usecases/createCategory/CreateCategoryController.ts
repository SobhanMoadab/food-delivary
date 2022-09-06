import e, { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { AppError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController"
import { DecodedExpressRequest } from "../../../Customers/infra/http/models/DecodedExpressRequest";
import { CreateCategoryUseCase } from "./CreateCategory";
import { CreateCategoryDTO } from "./CreateCategoryDTO";
import { CreateCategoryErrors } from "./CreateCategoryErrors";


export class CreateCategoryController extends BaseController {

    constructor(private useCase: CreateCategoryUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: CreateCategoryDTO = req.body as CreateCategoryDTO

        dto = {
            name: dto.name
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case CreateCategoryErrors.DuplicateCategoryName:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case AppError.UnexpectedError:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    default:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                }
            } else {
                return res.status(201).json({ status: 201, msg: 'Successful' })
            }
        } catch (err) {

        }
    }
}