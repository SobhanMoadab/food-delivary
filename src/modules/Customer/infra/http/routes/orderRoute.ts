/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { createSubmitOrderController } from '../../../usecases/submitOrder'
import { middleware } from '../../../../../shared/infra/http'

const orderRouter = express.Router()

orderRouter.post('/', middleware.ensureAuthenticated(), (req: any, res) => createSubmitOrderController.executeImpl(req, res))

export { orderRouter }