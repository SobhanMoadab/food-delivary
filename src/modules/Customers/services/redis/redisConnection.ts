import { RedisClientType } from '@redis/client';
import * as redis from 'redis';

// const authConfig = {
//     secret: process.env.foodDelivarySecret,
//     tokenExpiryTime: 300, // seconds => 5 minutes
//     redisServerPort: process.env.DDD_FORUM_REDIS_PORT || 6379,
//     redisServerURL: 'redis://localhost:6379',
//     redisConnectionString: ''
// }
const redisUrl = `redis://localhost:6379`;
const redisClient: RedisClientType = redis.createClient({
    url: redisUrl,
});

const connectRedis = async () => {
    try {
        await redisClient.connect();
        console.log('Redis client connected...');
    } catch (err: any) {
        console.log({ redis: err });
        setTimeout(connectRedis, 5000);
    }
}

connectRedis()
redisClient.on('error', (err) => console.log({ redisErr: err }));
export { redisClient }
