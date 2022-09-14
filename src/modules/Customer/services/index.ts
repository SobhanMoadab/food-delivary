import { RedisAuthService } from "./redis/redisAuthService";
import { redisClient } from "./redis/redisConnection";

const authService = new RedisAuthService(redisClient)


export {
    authService
}