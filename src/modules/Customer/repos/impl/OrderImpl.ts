import { Model } from "mongoose";
import { Order, OrderProps } from "../../domain/Order";
import { OrderMapper } from "../../mappers/orderMapper";
import { ICommentRepository } from "../ICommentRepository";
import { IOrderRepository } from "../IOrderRepository";


export class OrderRepository implements IOrderRepository {

    private _model: Model<OrderProps>

    constructor(schemaModel: Model<OrderProps>,
        public commentRepo: ICommentRepository
    ) {

        this._model = schemaModel;
    }
    async exists(id: string): Promise<boolean> {
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }

    async save(props: Order): Promise<void> {
        const orderId = props.orderId.id.toString()
        const exists = await this.exists(orderId)
        const isNew = !exists
        const toPers: OrderProps = OrderMapper.toPersistence(props)
        if (isNew) {
            await this._model.create(toPers)
        } else {
            await this._model.findByIdAndUpdate(orderId, toPers)
            await this.commentRepo.saveBulk(props.comments.getItems())
        }
        return
    }

    async findById(id: string): Promise<Order> {
        const order = await this._model.findById(id).lean()
        if (!order) throw new Error()
        return OrderMapper.toDomain({ ...order })
    }
}