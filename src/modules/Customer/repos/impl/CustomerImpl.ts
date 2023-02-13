import { Model } from "mongoose";
import { Customer, CustomerProps } from "../../domain/Customer";
import { ICustomerRepository } from "../ICustomerRepository";
import { plainToInstance } from "class-transformer";
import { CustomerMapper } from "../../mappers/customerMapper";

export class CustomerRepository implements ICustomerRepository {

    private _model: Model<CustomerProps>

    constructor(schemaModel: Model<CustomerProps>) {

        this._model = schemaModel;
    }
    async save(props: Customer): Promise<void> {
        const toPers = CustomerMapper.toPersistence(props)
        await this._model.create(toPers)
        return
    }

    async exists(email: string): Promise<boolean> {
        const exists = await this._model.findOne({ email })
        return exists ? true : false

    }

    async list(): Promise<Customer[]> {

        const list = await this._model.find()
        if (!list) throw new Error('Empty list')
        return plainToInstance(Customer, list)
    }

    async getCustomerByEmail(email: string): Promise<Customer> {
        const customer = await this._model.findOne({ email }).lean()
        if (!customer) throw new Error('Not found')
        return CustomerMapper.toDomain(customer)
    }

    async findById(id: string): Promise<Customer> {
        const customer = await this._model.findById(id).lean()
        if (!customer) throw new Error('Not found')
        return CustomerMapper.toDomain(customer)
    }
}