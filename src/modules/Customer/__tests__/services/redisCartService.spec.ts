import { RedisClientType } from "redis"
import { ICartService } from "../../services/cartService"
import { AddFoodToCartDTO } from "../../usecases/addFoodToCart/AddFoodToCartDTO"
import { redisClient } from '../../services/redis/redisConnection'
import { RedisCartService } from "../../services/redis/redisCartService"

describe('Redis Cart Service', () => {
    let cartService: RedisCartService

    beforeEach(() => {
        cartService = new RedisCartService(redisClient)
        redisClient.flushAll()
    })

    it('should add foodId to cart when item does not exists', async () => {
        const dto = {
            userId: '1',
            foodId: '1'
        }

        const result1 = await cartService.retrieveItems(dto.userId)
        expect(result1).toBeFalsy()
        await cartService.increment(dto.userId, dto.foodId)
        const result2 = await cartService.retrieveItems(dto.userId)
        expect(result2).toBe("1")

    })

    it('should increment if item exists', async () => {
        const dto: AddFoodToCartDTO = {
            foodId: '1',
            qty: 1,
            userId: '1'
        }
        await cartService.increment(dto.userId, dto.foodId)
        const result1 = await cartService.retrieveItems(dto.userId)

        await cartService.increment(dto.userId, dto.foodId)
        const result2 = await cartService.retrieveItems(dto.userId)

        expect(result1).toBeTruthy()
        expect(result2).toBe("2")

        // expect(result[0])

        // const items = await cartService.retrieveItems(dto.userId)
        // expect(items.qty).toBe(2)

    })
})