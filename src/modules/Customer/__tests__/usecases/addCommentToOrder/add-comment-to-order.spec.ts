import { OrderRepository } from "../../../repos/impl/OrderImpl"
import { IOrderRepository } from "../../../repos/IOrderRepository"
import { AddCommentToOrder } from "../../../usecases/addCommentToOrder/AddCommentToOrder"
import { AddCommentToOrderDTO } from "../../../usecases/addCommentToOrder/AddCommentToOrderDTO"
import { Order404 } from "../../../usecases/addCommentToOrder/AddCommentToOrderErrors"


describe('AddCommentToOrder UseCase', () => {
    let useCase: AddCommentToOrder
    let dto: AddCommentToOrderDTO
    let orderRepo: IOrderRepository

    beforeEach(() => {
        orderRepo = {
            findById: jest.fn(),
            save: jest.fn()
        }
        useCase = new AddCommentToOrder(orderRepo)
        dto = {
            orderId: 'test'
        }
    })

    it('should be defined', () => {
        expect(useCase).toBeDefined()
    })

    it('should throw error if order does not exists', async () => {
        orderRepo.findById = jest.fn(() => Promise.reject())
        const result = await useCase.execute(dto)
        expect(result.value).toBeInstanceOf(Order404)
    })
})