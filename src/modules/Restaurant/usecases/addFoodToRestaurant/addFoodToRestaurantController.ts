import { Response } from "express"
import { UnexpectedError } from "../../../../shared/core/AppError"
import { BaseController } from "../../../../shared/infra/http/models/BaseController"
import { DecodedExpressRequest } from "../../../Customer/infra/http/models/DecodedExpressRequest"
import { AddFoodToRestaurantUseCase } from "./addFoodToRestaurant"
import { AddFoodToRestaurantDTO } from "./addFoodToRestaurantDTO"


export class AddFoodToRestaurantController extends BaseController {

    constructor(private useCase: AddFoodToRestaurantUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: AddFoodToRestaurantDTO = req.body as AddFoodToRestaurantDTO

        dto = {
            name: dto.name,
            recipe: dto.recipe,
            discountedFee: dto.discountedFee,
            fee: dto.fee,
            restaurantId: dto.restaurantId,
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
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