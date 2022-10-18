/* eslint-disable @typescript-eslint/no-explicit-any */
import { UnexpectedError } from "../../../../shared/core/AppError";
import { Either, left, Result, right } from "../../../../shared/core/Result";
import { UseCase } from "../../../../shared/core/UseCase";
import { Food } from "../../../Restaurant/domain/food";
import { Restaurant } from "../../../Restaurant/domain/restaurant";
import { IFoodRepository } from "../../../Restaurant/repos/IFoodRepository";
import { IRestaurantRepository } from "../../../Restaurant/repos/IRestaurantRepository";
import { Food404 } from "../../../Restaurant/usecases/addFoodToRestaurant/addFoodToRestaurantErrors";
import { Order } from "../../domain/Order";
import { IOrderRepository } from "../../repos/IOrderRepository";
import { SubmitOrderDTO } from "./SubmitOrderDTO";
import { RestaurantNotFoundError } from "./SubmitOrderErrors";


type Response = Either<
    Food404 |
    RestaurantNotFoundError |
    UnexpectedError |
    Result<any>,
    Result<void>
>

export class SubmitOrderUseCase implements UseCase<SubmitOrderDTO, Promise<Response>> {

    constructor(
        public orderRepo: IOrderRepository,
        public restaurantRepo: IRestaurantRepository,
        public foodRepo: IFoodRepository,

    ) { }

    async execute(req: SubmitOrderDTO): Promise<Response> {

        let restaurant: Restaurant
        let food: Food

        try {

            try {
                restaurant = await this.restaurantRepo.findById(req.restaurantId)
            } catch (err) {
                return left(new RestaurantNotFoundError)
            }
            try {
                food = await this.foodRepo.findById(req.foodId)
            } catch (err) {
                return left(new Food404())
            }
            const props = {
                food,
                // customer: Customer,
                restaurant,
                foodsPrice: req.foodsPrice,
                status: 'CREATED'
            }
            // const orderOrError = Order.create(props)
            // if (orderOrError.isFailure) {
            // return left(orderOrError)
            // }

            // const order = orderOrError.getValue()
            // await this.orderRepository.save(order)

            return right(Result.ok<void>())

        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }

    }
}