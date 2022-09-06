import { RedisClientType } from "@redis/client";


export abstract class AbstractRedisClient {

    protected client: RedisClientType;
    private tokenExpiryTime: number = 604800;

    constructor(client: RedisClientType) {
        this.client = client;
    }

    // public async start() {
    //     await this.client.connect()
    //         .then(() => console.log({ Redis: 'Connected' }))
    //         .catch(err => console.log({ err }))
    // }
    public async set(key: string, value: any): Promise<any> {
        try {
            await this.client.set(key, value)
        } catch (error) {
            console.log({ error })
        }
    }

    // public testConnection(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         this.client.set('test', 'connected',
    //             (err) => {
    //                 if (err) {
    //                     reject();
    //                 } else {
    //                     resolve(true);
    //                 }
    //             })
    //     })
    // }
}