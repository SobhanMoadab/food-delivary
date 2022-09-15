/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Product } from "../../../Restaurant/domain/product";
import { Restaurant } from "../../../Restaurant/domain/restaurant";
import { IProductRepository } from "../../../Restaurant/repos/IProductRepository";
import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository";
import { Product404 } from "../../../Restaurant/usecases/createProduct/CreateProductErrors";
import { Order } from "../../domain/Order";
import { OrderMapper } from "../../mappers/orderMapper";
import { IOrderRepository } from "../../repos/IOrderRepository";
import { SubmitOrderDTO } from "./SubmitOrderDTO";
import { RestaurantNotFoundError } from "./SubmitOrderErrors";


type Response = Either<
    Product404 |
    RestaurantNotFoundError |
    UnexpectedError |
    Result<any>,
    Result<void>
>

export class SubmitOrderUseCase implements UseCase<SubmitOrderDTO, Promise<Response>> {


    constructor(
        public orderRepository: IOrderRepository,
        public restaurantRepository: IRestaurantRepository,
        public productRepository: IProductRepository,

    ) {

    }

    async execute(req: SubmitOrderDTO): Promise<Response> {

        let restaurant: Restaurant
        let product: Product

        try {

            try {
                restaurant = await this.restaurantRepository.findById(req.restaurantId)
            } catch (err) {
                return left(new RestaurantNotFoundError)
            }
            try {
                product = await this.productRepository.findById(req.productId)
            } catch (err) {
                return left(new Product404())
            }
            const props = {
                product,
                // customer: Customer,
                restaurant,
                foodsPrice: req.foodsPrice,
                status: 'CREATED'
            }
            const orderOrError = Order.create(props)
            if (orderOrError.isFailure) {
                return left(orderOrError)
            }

            const order = orderOrError.getValue()
            await this.orderRepository.save(order)

            return right(Result.ok<void>())

        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }

    }
}