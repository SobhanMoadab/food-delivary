import { cartService } from "../../services"
import { ICartService } from "../../services/cartService"
import { RemoveFoodFromCart } from "../../usecases/removeFoodFromCart/RemoveFoodFromCart"
import { RemoveFoodFromCartDTO } from "../../usecases/removeFoodFromCart/RemoveFoodFromCartDTO"

describe('Remove food from cart', () => {
    let useCase: RemoveFoodFromCart
    let cartService: ICartService
    let dto: RemoveFoodFromCartDTO

    beforeEach(() => {
        dto = {
            userId: 'test'
        }
        cartService = {
            decrement: jest.fn(),
            getCartItems: jest.fn(),
            increment: jest.fn(),
            emptyCart: jest.fn()
        }
        useCase = new RemoveFoodFromCart(cartService)
    })

    it('should empty cart', async () => {
        
        const result = await useCase.execute(dto)
        expect(result.value.isFailure).toBeFalsy()
    })
})