/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { middleware } from '../../../../../shared/infra/http'
import { createAddCommentToOrderController } from '../../../usecases/addCommentToOrder'

const commentRouter = express.Router()

commentRouter.post('/', (req: any, res) => createAddCommentToOrderController.executeImpl(req, res))

export { commentRouter }