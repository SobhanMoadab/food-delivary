import { Response } from "express";
import { NotFound404, UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { Food } from "../../domain/food";
import { DecodedExpressRequest } from "../../infra/models/decodedRequest";
import { GetFoodsOfRestaurant } from "./GetFoodsOfRestaurant";
import { GetFoodsOfRestaurantDTO } from "./GetFoodsOfRestaurantDTO";




export class GetFoodsOfRestaurantController extends BaseController {

    constructor(public useCase: GetFoodsOfRestaurant) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {

        const dto: GetFoodsOfRestaurantDTO = {
            restaurantId: req.params.restaurantId
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value;
                switch (error.constructor) {
                    default:
                        return res.status(500).json({ status: 500, msg: error.getErrorValue().message })
                }
            } else {
                const foods = result.value.getValue()
                return res.status(200).json({ status: 200, result: foods })
            }
        } catch (err) {
            return res.status(500).json({ status: 500, err })
        }

    }
}