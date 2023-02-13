import { RestaurantId } from "../../../../Restaurant/domain/RestaurantId"
import { Comment } from "../../../domain/Comment"
import { CustomerId } from "../../../domain/CustomerId"
import { Order } from "../../../domain/Order"
import { OrderId } from "../../../domain/OrderId"
import { IOrderRepository } from "../../../repos/IOrderRepository"
import { AddCommentToOrder } from "../../../usecases/addCommentToOrder/AddCommentToOrder"
import { AddCommentToOrderDTO } from "../../../usecases/addCommentToOrder/AddCommentToOrderDTO"
import { Order404 } from "../../../usecases/addCommentToOrder/AddCommentToOrderErrors"


describe('AddCommentToOrder UseCase', () => {
    let useCase: AddCommentToOrder
    let dto: AddCommentToOrderDTO
    let orderRepo: IOrderRepository
    let order: Order
    let spy: any

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
            customerId: CustomerId.create().getValue()
        }).getValue()
        spy = jest.spyOn(order, 'addComment')
    })

    it('should be defined', () => {
        expect(useCase).toBeDefined()
    })

    it('should throw error if order does not exists', async () => {
        orderRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value).toBeInstanceOf(Order404)
    })

    // it('should respond correctly without error', async () => {
    //     orderRepo.findById = jest.fn(() => Promise.resolve(order))
    //     const result = await useCase.execute(dto)
    //     expect(result.isLeft()).toBeFalsy()

    // })
    it('should add comment to order', async () => {
        // given i provide correct dto
        const validInput: AddCommentToOrderDTO = {
            body: 'test',
            customerId: '63106409fb97ac259999732a',
            orderId: '63ea394884905a01bc175533',
            title: 'test'
        }
        // when i attempt to add comment to order
        orderRepo.findById = jest.fn(() => Promise.resolve(order))
        const result = await useCase.execute(validInput)
        // order.addComment(comment)
        // then i expect
        expect(orderRepo.findById).toBeCalled()
        expect(spy).toBeCalled()
        expect(result.isLeft()).toBeFalsy()
    })
})