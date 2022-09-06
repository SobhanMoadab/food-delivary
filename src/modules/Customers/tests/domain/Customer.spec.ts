import { Result } from "../../../../shared/core/Result";
import { Customer } from "../../domain/Customer";

describe('Customer', () => {
    let customer: Customer
    let data = {
        name: 'sobhan',
        email: 'test@gmail.com',
        phoneNumber: 83888,
        address: 'test'
    }
    let result = Customer.create(data)
    if (result.isSuccess) {
        customer = result.getValue()
    }
    it('should create instance of Customer', async () => {
        expect(customer).toBeInstanceOf(Customer)
    })
})