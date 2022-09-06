import express from 'express'
import { createRegisterController } from '../../../usecases/register'
const customerRouter = express.Router()

customerRouter.get('/', (req, res) => res.send('hellooo guyssss'))
customerRouter.post('/', (req: any, res) => createRegisterController.executeImpl(req, res))

export { customerRouter }