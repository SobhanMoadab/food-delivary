/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { createRefreshAccessTokenController } from '../../../usecases/refreshAccessToken'
import { createRegisterController } from '../../../usecases/register'
const customerRouter = express.Router()

customerRouter.get('/', (req, res) => res.send('hellooo guyssss'))
customerRouter.post('/register', (req: any, res) => createRegisterController.executeImpl(req, res))
customerRouter.post('/refresh', (req: any, res) => createRefreshAccessTokenController.executeImpl(req, res))

export { customerRouter }