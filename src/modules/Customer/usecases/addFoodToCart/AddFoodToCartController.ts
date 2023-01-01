import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { AddFoodToCart } from "./AddFoodToCart";
import { AddFoodToCartDTO } from "./AddFoodToCartDTO";

export class AddFoodToCartController extends BaseController {

    constructor(private useCase: AddFoodToCart) {
        super()
    }


    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: AddFoodToCartDTO = req.body as AddFoodToCartDTO
        const { userId } = req.body

        dto = {
            userId,
            foodId: req.body.foodId
        }

        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case Food404:
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