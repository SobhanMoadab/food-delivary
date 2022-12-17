import { RedisAuthService } from "./redis/redisAuthService";
import { RedisCartService } from "./redis/redisCartService";
import { redisClient } from "./redis/redisConnection";

const authService = new RedisAuthService(redisClient)
const cartService = new RedisCartService(redisClient)

export {
    authService,
    cartService
}