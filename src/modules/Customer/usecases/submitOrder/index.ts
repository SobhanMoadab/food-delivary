import { OrderModel } from "../../../../shared/infra/database/mongoose/models/Order"
import { ProductModel } from "../../../../shared/infra/database/mongoose/models/Product"
import { RestaurantModel } from "../../../../shared/infra/database/mongoose/models/Restaurant"
import { ProductRepository } from "../../../Restaurant/repos/impl/productImpl"
import { RestaurantRepository } from "../../../Restaurant/repos/impl/restaurantImpl"
import { OrderRepository } from "../../repos/impl/OrderImpl"
import { SubmitOrderUseCase } from "./SubmitOrder"
import { SubmitOrderController } from "./SubmitOrderController"

const orderRepository = new OrderRepository(OrderModel)
const restaurantRepository = new RestaurantRepository(RestaurantModel)
const productRepository = new ProductRepository(ProductModel)

const createSubmitOrderUseCase = new SubmitOrderUseCase(orderRepository, restaurantRepository, productRepository)
const createSubmitOrderController = new SubmitOrderController(createSubmitOrderUseCase)

export {
    createSubmitOrderController,
    createSubmitOrderUseCase,

}