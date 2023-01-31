import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../infra/http/models/DecodedExpressRequest";
import { AddCommentToOrder } from "./AddCommentToOrder";
import { AddCommentToOrderDTO } from "./AddCommentToOrderDTO";
import { Order404 } from "./AddCommentToOrderErrors";

export class AddCommentToOrderController extends BaseController {
    constructor(private readonly useCase: AddCommentToOrder) {
        super()
    }
    async executeImpl(req: DecodedExpressRequest, res: Response) {
        let dto: AddCommentToOrderDTO = req.body as AddCommentToOrderDTO
        dto = {
            body: req.body.body,
            customerId: req.body.customerId,
            orderId: req.body.orderId,
            title: req.body.title
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case Order404:
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