import { RedisClientType } from "@redis/client";
import { throws } from "assert";
import { AddFoodToCartDTO } from "../../usecases/addFoodToCart/AddFoodToCartDTO";
import { CartIsEmpty } from "../../usecases/submitOrder/SubmitOrderErrors";
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
    public decrement(userId: string, foodId: string): Promise<void> {
        throw new Error()
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