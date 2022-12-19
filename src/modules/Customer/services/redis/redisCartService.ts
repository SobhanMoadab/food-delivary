import { RedisClientType } from "@redis/client";
import { ICartService } from "../cartService";
import { AbstractRedisClient } from "./redisAbstractClient";



export class RedisCartService extends AbstractRedisClient implements ICartService {
    constructor(redisClient: RedisClientType) {
        super(redisClient)
    }

    public addToCart() {
        return true
        // this.set()
    }
    public async decrement(userId: string, foodId: string): Promise<void> {
        const result = await this.retrieveItems(userId)
        if (result) {
            await this.client.hIncrBy(userId, foodId, -1)
        }
    }

    public async retrieveItems(userId: string) {
        const result = await this.client.hGetAll(`${userId}`)
        return result[1]
    }
    public async increment(userId: string, foodId: string) {
        const result = await this.retrieveItems(userId)
        if (!result) {
            await this.client.hSet(userId, foodId, 1)
        } else {
            await this.client.hIncrBy(`${userId}`, `1`, 1)
        }
    }
}