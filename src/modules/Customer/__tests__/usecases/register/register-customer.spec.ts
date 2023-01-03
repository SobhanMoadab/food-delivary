import { ICustomerRepository } from "../../../repos/ICustomerRepository"
import { IAuthService } from "../../../services/authService"
import { RegisterDTO } from "../../../usecases/register/RegisterDTO"
import { RegisterUseCase } from "../../../usecases/register/RegisterUseCase"


describe('Register customer use case', () => {

    let useCase: RegisterUseCase,
        customerRepo: ICustomerRepository,
        authService: IAuthService,
        dto: RegisterDTO

    beforeEach(() => {
        dto = {
            address: 'asdad',
            email: 'asdad',
            name: 'asdad',
            phoneNumber: 3333
        }
        customerRepo = {
            exists: jest.fn(),
            getCustomerByEmail: jest.fn(),
            list: jest.fn(),
            save: jest.fn()
        }
        authService = {
            createRefreshToken: jest.fn(),
            decodeJWT: jest.fn(),
            getEmailFromRefreshToken: jest.fn(),
            getTokens: jest.fn(),
            saveAuthenticatedCustomer: jest.fn(),
            signJWT: jest.fn()
        }
        useCase = new RegisterUseCase(customerRepo, authService)
    })

    it('should throw error if dto is not complete', async () => {
        dto.address = ''
        const result = await useCase.execute(dto)
        expect(result.isLeft).toBeTruthy()
    })

    it('should respond without error', async () => {
        const result = await useCase.execute(dto)
        expect(result.isRight).toBeTruthy()
    })
})