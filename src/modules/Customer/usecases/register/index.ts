
import { RegisterUseCase } from './RegisterUseCase'
import { RegisterController } from './RegisterController'
import { CustomerRepository } from '../../repos/impl/CustomerImpl'
import { CustomerModel } from '../../../../shared/infra/database/mongoose/models/Customer'
import { authService } from '../../services'

const createRegisterUseCase = new RegisterUseCase(new CustomerRepository(CustomerModel), authService)
const createRegisterController = new RegisterController(createRegisterUseCase)

export {
    createRegisterUseCase,
    createRegisterController
}