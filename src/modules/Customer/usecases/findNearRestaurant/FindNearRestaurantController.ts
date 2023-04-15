import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Restaurant404 } from "../../../Restaurant/usecases/registerRestaurant/RegisterRestaurantErrors";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { FindNearRestaurant } from "./FindNearRestaurant";
import { FindNearRestaurantDTO } from "./FindNearRestaurantDTO";

export class FindNearRestaurantController extends BaseController {
    constructor(private readonly useCase: FindNearRestaurant) {
        super()
    }
    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: FindNearRestaurantDTO = req.body as FindNearRestaurantDTO
        dto = {
            city: dto.city
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case Restaurant404:
                        return res.status(400).json({ status: 400, result: error.getErrorValue() })
                    case UnexpectedError:
                        return res.status(500).json({ status: 500, result: error.getErrorValue() })
                    default:
                        return res.status(500).json({ status: 500, result: error.getErrorValue() })
                }
            } else {
                return res.status(200).json({ status: 200, result: result.value.getValue() })
            }
        } catch (err) {
            return res.status(500).json({ status: 500, result: 'Something went wrong' })
        }
    }
}