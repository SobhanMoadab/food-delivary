import { Response } from "express";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { RemoveFoodFromCart } from "./RemoveFoodFromCart";


export class RemoveFoodFromCartController extends BaseController {

    constructor(private useCase: RemoveFoodFromCart) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response) {
        try {
            return res.status(201).json({ status: 201, msg: 'Successful' })

        } catch (err) {
            return res.status(500).json({ status: 500, msg: 'Something went wrong' })
        }
    }
}