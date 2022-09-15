import {  Model } from "mongoose";
import { Customer, CustomerProps } from "../../domain/Customer";
import { ICustomerRepository } from "../ICustomerRepository";
import { plainToInstance } from "class-transformer";

export class CustomerRepository implements ICustomerRepository {

    private _model: Model<CustomerProps>

    constructor(schemaModel: Model<CustomerProps>) {

        this._model = schemaModel;
    }
    async save({ name, address, email, phoneNumber }: Customer): Promise<void> {
        await this._model.create({ name, address, email, phoneNumber })
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

}