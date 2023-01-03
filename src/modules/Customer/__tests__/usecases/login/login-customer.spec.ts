import { ICustomerRepository } from "../../../repos/ICustomerRepository"
import { LoginDTO } from "../../../usecases/login/LoginDTO"
import { LoginUseCase } from "../../../usecases/login/LoginUseCase"


describe('Login customer useCase', () => {
    let useCase: LoginUseCase,
        dto: LoginDTO,
        customerRepo: ICustomerRepository

    beforeEach(() => {
        customerRepo = {
            exists: jest.fn(),
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
        customerRepo.exists = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeTruthy()
    })

    it('should respond without error', async () => {
        customerRepo.exists = jest.fn(() => Promise.resolve(true))
        const result = await useCase.execute(dto)
        console.log("🚀 ~ file: login-customer.spec.ts:32 ~ it ~ result", result)
        expect(result.value.isSuccess).toBeTruthy()
    })


})