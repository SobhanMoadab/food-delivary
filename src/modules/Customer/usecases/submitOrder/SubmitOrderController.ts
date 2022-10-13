import { Response } from "express"
import { UnexpectedError } from "../../../../shared/core/AppError"
import { BaseController } from "../../../../shared/infra/http/models/BaseController"
import { Product404 } from "../../../Restaurant/usecases/addProductToRestaurant/AddProductToRestaurantErrors"
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest"
import { SubmitOrderUseCase } from "./SubmitOrder"
import { SubmitOrderDTO } from "./SubmitOrderDTO"
import { RestaurantNotFoundError } from "./SubmitOrderErrors"



export class SubmitOrderController extends BaseController {

    constructor(private useCase: SubmitOrderUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: SubmitOrderDTO = req.body as SubmitOrderDTO

        dto = {
            // customerId: dto.customerId,
            foodsPrice: dto.foodsPrice,
            productId: dto.productId,
            restaurantId: dto.restaurantId

        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case RestaurantNotFoundError:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    case Product404:
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