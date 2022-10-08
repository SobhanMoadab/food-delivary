import { Customer } from "../domain/Customer";

export interface ICustomerRepository {
    save(customer: Customer): Promise<void>
    exists(email: string): Promise<boolean>
    list(): Promise<Customer[]>
    getCustomerByName(name: string): Promise<Customer>
}