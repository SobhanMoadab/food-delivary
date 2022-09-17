import { Model } from "mongoose";
import { Order, OrderProps } from "../../domain/Order";
import { OrderMapper } from "../../mappers/orderMapper";
import { IOrderRepository } from "../IOrderRepository";


export class OrderRepository implements IOrderRepository {

    private _model: Model<OrderProps>

    constructor(schemaModel: Model<OrderProps>) {

        this._model = schemaModel;
    }
    async save(props: Order): Promise<void> {
        const toPers: OrderProps = OrderMapper.toPersistence(props)
        const toPersistence = {
            foodsPrice: toPers.foodsPrice,
            product: toPers.product.id,
            restaurant: toPers.restaurant.id,
            status: toPers.foodsPrice
        }
        await this._model.create(toPersistence)
        return
    }

    async findById(id: string): Promise<Order> {
        const order = await this._model.findById(id).lean()
        if (!order) throw new Error()
        return OrderMapper.toDomain({ ...order })
    }
}