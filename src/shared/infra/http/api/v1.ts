import { Router } from 'express'
import { customerRouter } from '../../../../modules/Customer/infra/http/routes'
import { commentRouter } from '../../../../modules/Customer/infra/http/routes/commentRoute'
import { orderRouter } from '../../../../modules/Customer/infra/http/routes/orderRoute'
import { foodRouter, restaurantRouter } from '../../../../modules/Restaurant/infra/http/routes'
const v1Router = Router()

v1Router.use('/customers', customerRouter)
// v1Router.use('/categories', categoryRouter)
v1Router.use('/foods', foodRouter)
v1Router.use('/restaurants', restaurantRouter)
v1Router.use('/orders', orderRouter)
v1Router.use('/comments', commentRouter)


export { v1Router }