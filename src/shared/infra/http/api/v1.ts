import { Router } from 'express'
import { customerRouter } from '../../../../modules/Customers/infra/http/routes/index'
const v1Router = Router()

v1Router.use('/customers', customerRouter)

export { v1Router }