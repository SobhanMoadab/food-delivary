import { CommentModel } from "../../../../shared/infra/database/mongoose/models/Comment"
import { CustomerModel } from "../../../../shared/infra/database/mongoose/models/Customer"
import { OrderModel } from "../../../../shared/infra/database/mongoose/models/Order"
import { CommentRepository } from "../../repos/impl/CommentImpl"
import { CustomerRepository } from "../../repos/impl/CustomerImpl"
import { OrderRepository } from "../../repos/impl/OrderImpl"
import { AddCommentToOrder } from "./AddCommentToOrder"
import { AddCommentToOrderController } from "./AddCommentToOrderController"


const commentRepo = new CommentRepository(CommentModel)
const orderRepo = new OrderRepository(OrderModel, commentRepo)
const customerRepo = new CustomerRepository(CustomerModel)

const createAddCommentToOrder = new AddCommentToOrder(orderRepo, customerRepo)
const createAddCommentToOrderController = new AddCommentToOrderController(createAddCommentToOrder)

export {
    createAddCommentToOrder,
    createAddCommentToOrderController
}