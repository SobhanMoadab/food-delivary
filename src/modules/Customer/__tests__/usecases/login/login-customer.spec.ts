import { ICustomerRepository } from "../../../repos/ICustomerRepository"
import { IAuthService } from "../../../services/authService"
import { LoginDTO } from "../../../usecases/login/LoginDTO"
import { LoginUseCase } from "../../../usecases/login/LoginUseCase"


describe('Login customer useCase', () => {
    let useCase: LoginUseCase,
        dto: LoginDTO,
        customerRepo: ICustomerRepository,
        authService: IAuthService

    beforeEach(() => {
        authService = {
            createRefreshToken: jest.fn(),
            decodeJWT: jest.fn(),
            getEmailFromRefreshToken: jest.fn(),
            getTokens: jest.fn(),
            saveAuthenticatedCustomer: jest.fn(),
            signJWT: jest.fn()
        }
        customerRepo = {
            exists: jest.fn(),
            getCustomerByEmail: jest.fn(),
            list: jest.fn(),
            save: jest.fn()
        }

        useCase = new LoginUseCase(customerRepo, authService)
        dto = {
            email: 'test'
        }
    })

    it('should throw error if email is not found', async () => {
        customerRepo.exists = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
    })

    it('should respond without error', async () => {
        customerRepo.exists = jest.fn(() => Promise.resolve(true))
        const result = await useCase.execute(dto)
        expect(result.value.isSuccess).toBeTruthy()
    })


})