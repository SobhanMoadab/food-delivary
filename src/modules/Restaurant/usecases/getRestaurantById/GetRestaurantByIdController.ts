import { Response } from "express";
import { NotFound404, UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Req } from "../../../../shared/infra/http/models/ExpressRequest";
import { GetRestaurantById } from "./GetRestaurantById";
import { GetRestaurantByIdDTO } from "./GetRestaurantByIdDTO";


export class GetRestaurantByIdController extends BaseController {

    constructor(public useCase: GetRestaurantById) {
        super();
    }

    async executeImpl(req: Req, res: Response): Promise<any> {

        let dto: GetRestaurantByIdDTO = req.body as GetRestaurantByIdDTO
        dto = {
            restaurantId: dto.restaurantId
        }
        try {
            const result = await this.useCase.execute(dto);

            if (result.isLeft()) {
                const error = result.value;

                switch (error.constructor) {
                    case NotFound404:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    case UnexpectedError:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue() })
                    default:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                }

            } else {
                const restaurants = result.value.getValue();
                return res.status(200).json({ status: 200, result: restaurants })
            }

        } catch (err) {
            return res.status(400).json({ status: 400, msg: err })
        }
    }
}