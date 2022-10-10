
import { CustomerModel } from '../../../../shared/infra/database/mongoose/models/Customer'
import { CustomerRepository } from '../../repos/impl/CustomerImpl'
import { authService } from '../../services'
import { RefreshAccessToken } from './RefershAccessToken'
import { RefreshAccessTokenController } from './RefershAccessTokenController'

const createRefreshAccessTokenUseCase = new RefreshAccessToken(new CustomerRepository(CustomerModel), authService)
const createRefreshAccessTokenController = new RefreshAccessTokenController(createRefreshAccessTokenUseCase)

export {
    createRefreshAccessTokenUseCase,
    createRefreshAccessTokenController
}