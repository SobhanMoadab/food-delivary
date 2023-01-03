import { ICustomerRepository } from "../../../repos/ICustomerRepository"
import { LoginDTO } from "../../../usecases/login/LoginDTO"
import { LoginUseCase } from "../../../usecases/login/LoginUseCase"


describe('Login customer useCase', () => {
    let useCase: LoginUseCase,
        dto: LoginDTO,
        customerRepo: ICustomerRepository

    beforeEach(() => {
        customerRepo = {
            exists: jest.fn(() => Promise.reject()),
            getCustomerByEmail: jest.fn(),
            list: jest.fn(),
            save: jest.fn()
        }
        useCase = new LoginUseCase(customerRepo)
        dto = {
            email: 'test'
        }
    })

    it('should throw error if email is not found', async () => {
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
    })


})