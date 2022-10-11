/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { createRefreshAccessTokenController } from '../../../usecases/refreshAccessToken'
import { createRegisterController } from '../../../usecases/register'
import { middleware } from '../../../../../shared/infra/http/utils'
const customerRouter = express.Router()

customerRouter.get('/', middleware.ensureAuthenticated(), (req, res) => res.send('hellooo guyssss'))
customerRouter.post('/register', (req: any, res) => createRegisterController.executeImpl(req, res))
customerRouter.post('/refresh', (req: any, res) => createRefreshAccessTokenController.executeImpl(req, res))

export { customerRouter }