
import { CustomerModel } from '../../../../shared/infra/database/mongoose/models/Customer'
import { CustomerRepository } from '../../repos/impl/CustomerImpl'
import { LoginUseCase } from './LoginUseCase'



const customerRepo = new CustomerRepository(CustomerModel)
const createLoginUseCase = new LoginUseCase(customerRepo)
// const createLoginController = new LoginController(createLoginUseCase)

export {
    createLoginUseCase,
}