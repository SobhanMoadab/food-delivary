import { Router } from 'express'
import { customerRouter } from '../../../../modules/Customers/infra/http/routes/index'
import { categoryRouter } from '../../../../modules/RestaurantOwner/infra/routes'
const v1Router = Router()

v1Router.use('/customers', customerRouter)
v1Router.use('/categories', categoryRouter)

export { v1Router }