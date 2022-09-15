import { Router } from 'express'
import { customerRouter } from '../../../../modules/Customer/infra/http/routes'
import { orderRouter } from '../../../../modules/Customer/infra/http/routes/orderRoute'
import { categoryRouter, productRouter, restaurantRouter } from '../../../../modules/Restaurant/infra/http/routes'
const v1Router = Router()

v1Router.use('/customers', customerRouter)
v1Router.use('/categories', categoryRouter)
v1Router.use('/products', productRouter)
v1Router.use('/restaurants', restaurantRouter)
v1Router.use('/orders', orderRouter )

export { v1Router }