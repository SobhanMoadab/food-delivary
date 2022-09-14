import { Customer } from "../../domain/Customer";
import { ICustomerRepository } from "../ICustomerRepository";

export class InMemoryCustomerRepository implements ICustomerRepository {
    customers: Customer[] = []

    public async create(customer: Customer): Promise<void> {
        this.customers.push(customer)
        return
    }

    public async exists(email: string): Promise<boolean> {

        return !!this.customers.find(customer => customer.email === email)
    }
    public async list(): Promise<Customer[]> {
        return [...this.customers]
    }
}