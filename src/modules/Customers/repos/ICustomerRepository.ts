import { Customer } from "../domain/Customer";

export interface ICustomerRepository {
    create(customer: Customer): Promise<void>
    exists(email: string): Promise<boolean>
    list(): Promise<Customer[]>
}