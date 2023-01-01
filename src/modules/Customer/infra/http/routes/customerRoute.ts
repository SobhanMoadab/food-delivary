/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { createRefreshAccessTokenController } from '../../../usecases/refreshAccessToken'
import { createRegisterController } from '../../../usecases/register'
import { middleware } from '../../../../../shared/infra/http'
import { createRemoveFoodFromCartController } from '../../../usecases/removeFoodFromCart'
import { createAddFoodToCartController } from '../../../usecases/addFoodToCart'
const customerRouter = express.Router()

customerRouter.get('/', middleware.ensureAuthenticated(), (req, res) => res.send('hellooo guyssss'))
customerRouter.post('/register', (req: any, res) => createRegisterController.executeImpl(req, res))
customerRouter.post('/refresh', (req: any, res) => createRefreshAccessTokenController.executeImpl(req, res))
customerRouter.post('/remove-cart', (req: any, res) => createRemoveFoodFromCartController.executeImpl(req, res))
customerRouter.post('/increment-cart', (req: any, res) => createAddFoodToCartController.executeImpl(req, res))
// customerRouter.post('/decrement-cart', (req: any, res) => createRefreshAccessTokenController.executeImpl(req, res))

export { customerRouter }