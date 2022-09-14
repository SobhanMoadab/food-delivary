import { Router } from 'express'
import { customerRouter } from '../../../../modules/Customers/infra/http/routes'
import { categoryRouter, productRouter } from '../../../../modules/RestaurantOwner/infra/http/routes'
const v1Router = Router()

v1Router.use('/customers', customerRouter)
v1Router.use('/categories', categoryRouter)
v1Router.use('/products', productRouter)

export { v1Router }