import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { ICustomerRepository } from "../../repos/ICustomerRepository";
import { InMemoryCustomerRepository } from "../../repos/impl/InMemoryCustomerRepo";
import { RegisterUseCase } from "../../usecases/register/RegisterUseCase";
import { Customer } from "../../domain/Customer";
import { left } from "../../../../shared/core/Result";
import { RegisterDTO } from "../../usecases/register/RegisterDTO";
import { plainToInstance } from "class-transformer";

describe('register usecase', () => {
    let sut: RegisterUseCase
    let customerRepo: ICustomerRepository
    let customerObject: Customer
    let data = {
        name: "sobhan",
        email: "sobhan@bebe.com",
        address: "sobhan - sobhan",
        phoneNumber: 9308140275
    }
    beforeEach(() => {
        customerRepo = new InMemoryCustomerRepository()
        sut = new RegisterUseCase(customerRepo)
        customerObject = Customer.create(data).getValue()
    })
    it('should create register use case', () => {
        expect(sut).toBeInstanceOf(RegisterUseCase)
    })
    it('should return correct response from usecase', async () => {
        let dto: RegisterDTO
        dto = {
            name: "sobhan",
            email: "sobhan@bebe.com",
            address: "sobhan - sobhan",
            phoneNumber: 9308140275
        }
        const result = await sut.execute(dto)
        const res = result.value.getValue()
        const plain = plainToInstance(Customer, res)
        expect(plain).toBeInstanceOf(Customer)
    })

})