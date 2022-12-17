import { RedisClientType } from "@redis/client";
import { AbstractRedisClient } from "./redisAbstractClient";



export class RedisCartService extends AbstractRedisClient {
    constructor(redisClient: RedisClientType) {
        super(redisClient)
    }

    public addToCart() {
        return true
        // this.set()
    }
    public retrieveCartItems() {
        return true
    }
}