import { OrderModel } from "../../../../shared/infra/database/mongoose/models/Order"
import { OrderRepository } from "../../repos/impl/OrderImpl"
import { AddCommentToOrder } from "./AddCommentToOrder"
import { AddCommentToOrderController } from "./AddCommentToOrderController"

const orderRepo = new OrderRepository(OrderModel)
const createAddCommentToOrder = new AddCommentToOrder(orderRepo)
const createAddCommentToOrderController = new AddCommentToOrderController(createAddCommentToOrder)

export {
    createAddCommentToOrder,
    createAddCommentToOrderController
}