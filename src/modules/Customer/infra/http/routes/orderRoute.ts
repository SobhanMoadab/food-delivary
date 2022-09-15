/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { createSubmitOrderController } from '../../../usecases/submitOrder'
const orderRouter = express.Router()

orderRouter.post('/', (req: any, res) => createSubmitOrderController.executeImpl(req, res))

export { orderRouter }