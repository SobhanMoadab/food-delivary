/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from "express";
import { UnexpectedError } from "../../../../shared/core/AppError";
import { BaseController } from "../../../../shared/infra/http/models/BaseController";
import { DecodedExpressRequest } from "../../../Customer/infra/http/models/DecodedExpressRequest";
import { RegisterRestaurantUseCase } from "./RegisterRestaurant";
import { RegisterRestaurantDTO } from "./RegisterRestaurantDTO";


export class RegisterRestaurantController extends BaseController {

    constructor(public useCase: RegisterRestaurantUseCase) {
        super()
    }

    async executeImpl(req: DecodedExpressRequest, res: Response): Promise<any> {

        let dto: RegisterRestaurantDTO = req.body as RegisterRestaurantDTO
        dto = {
            name: dto.name,
            city: dto.city,
            ownerName: dto.ownerName,
            ownerSurname: dto.ownerName,
            phoneNumber: dto.phoneNumber
        }
        try {
            const result = await this.useCase.execute(dto)
            if (result.isLeft()) {
                const error = result.value
                switch (error.constructor) {
                    case UnexpectedError:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })
                    default:
                        return res.status(400).json({ status: 400, msg: error.getErrorValue() })

                }
            } else {
                return res.status(201).json({ status: 201, msg: 'Successful' })
            }
        } catch (err) {
            return res.status(500).json({ status: 500, msg: 'Something went wrong' })
        }

    }
}