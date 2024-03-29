import { RedisClientType } from "redis"
import { ICartService } from "../../services/cartService"
import { AddFoodToCartDTO } from "../../usecases/addFoodToCart/AddFoodToCartDTO"
import { redisClient } from '../../services/redis/redisConnection'
import { RedisCartService } from "../../services/redis/redisCartService"

describe('Redis Cart Service', () => {
    let cartService: RedisCartService
    let dto: AddFoodToCartDTO

    beforeEach(async () => {
        cartService = new RedisCartService(redisClient)
        redisClient.flushAll()
        dto = {
            foodId: 'foodId',
            userId: 'userId'
        }

    })


    it('should add foodId to cart when item does not exists', async () => {

        // const result1 = await cartService.getCartItems(dto.userId)
        // expect(result1[1]).toBeFalsy()
        // await cartService.increment(dto.userId, dto.foodId)
        // const result2 = await cartService.getCartItems(dto.userId)
        await cartService.addToCart(dto.userId, dto.foodId)
        const result1 = await cartService.getCartItems(dto.userId)
        expect(result1).toBeTruthy()
        expect(result1[dto.foodId]).toBe(dto.foodId)
    })

    it('should increment', async () => {

        await cartService.addToCart(dto.userId, dto.foodId)
        await cartService.increment(dto.userId)
        await cartService.increment(dto.userId)
        const result2 = await cartService.getCartItems(dto.userId)
        expect(result2['qty']).toBe("2")
    })

    it('should decrement', async () => {

        await cartService.addToCart(dto.userId, dto.foodId)
        await cartService.increment(dto.userId)
        const result1 = await cartService.getCartItems(dto.userId)
        expect(result1['qty']).toBe('1')

        await cartService.decrement(dto.userId)
        const result2 = await cartService.getCartItems(dto.userId)
        expect(result2['qty']).toBe('0')
    })

    it('should empty cart', async () => {
        await cartService.addToCart(dto.userId, dto.foodId)
        await cartService.increment(dto.userId)
        const result1 = await redisClient.keys(dto.userId)
        expect(result1.includes('userId')).toBeTruthy()

        await cartService.emptyCart(dto.userId)
        const result2 = await redisClient.keys(dto.userId)
        expect(result2.includes('userId')).toBeFalsy()
        
    })
})