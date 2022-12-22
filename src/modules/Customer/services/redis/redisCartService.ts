import { RedisClientType } from "@redis/client";
import { ICartService } from "../cartService";
import { AbstractRedisClient } from "./redisAbstractClient";



export class RedisCartService extends AbstractRedisClient implements ICartService {
    constructor(redisClient: RedisClientType) {
        super(redisClient)
    }

    public async addToCart(userId: string, foodId: string) {
        await this.client.hSet(userId, foodId, foodId)
    }
    public async decrement(userId: string, foodId: string): Promise<void> {
        const result = await this.getCartItems(userId)
        if (result) {
            await this.client.hIncrBy(userId, 'qty', -1)
        }
    }

    public async getCartItems(userId: string) {
        try {
            const result = await this.client.hGetAll(`${userId}`)
            if (!result || result === null) {
                throw new Error()
            }
            return result

        } catch (err) {
            throw new Error()
        }
    }

    public async increment(userId: string) {
        await this.client.hIncrBy(`${userId}`, 'qty', 1)
    }
}