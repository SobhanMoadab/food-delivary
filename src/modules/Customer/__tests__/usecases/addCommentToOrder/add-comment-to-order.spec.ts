import { RestaurantId } from "../../../../Restaurant/domain/RestaurantId"
import { CustomerId } from "../../../domain/CustomerId"
import { Order } from "../../../domain/Order"
import { IOrderRepository } from "../../../repos/IOrderRepository"
import { AddCommentToOrder } from "../../../usecases/addCommentToOrder/AddCommentToOrder"
import { AddCommentToOrderDTO } from "../../../usecases/addCommentToOrder/AddCommentToOrderDTO"
import { Order404 } from "../../../usecases/addCommentToOrder/AddCommentToOrderErrors"


describe('AddCommentToOrder UseCase', () => {
    let useCase: AddCommentToOrder
    let dto: AddCommentToOrderDTO
    let orderRepo: IOrderRepository
    let order: Order

    beforeEach(() => {
        orderRepo = {
            findById: jest.fn(),
            save: jest.fn()
        }
        useCase = new AddCommentToOrder(orderRepo)
        dto = {
            orderId: 'test',
            body: 'test',
            customerId: CustomerId.create().getValue().id.toString(),
            title: 'test'
        }
        order = Order.create({
            foodsPrice: 3333,
            restaurantId: RestaurantId.create().getValue(),
            status: 'test',
        }).getValue()
    })

    it('should be defined', () => {
        expect(useCase).toBeDefined()
    })

    it('should throw error if order does not exists', async () => {
        orderRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value).toBeInstanceOf(Order404)
    })

    it('should respond correctly without error', async () => {
        orderRepo.findById = jest.fn(() => Promise.resolve(order))
        const result = await useCase.execute(dto)
        expect(result.isLeft()).toBeFalsy()

    })
})