/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { RedisClientType } from "@redis/client";


export abstract class AbstractRedisClient {

    protected client: RedisClientType;
    private tokenExpiryTime = 604800;

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
            const result = await this.client.set(key, value)
            return result

        } catch (err) {
            throw new Error()
        }

    }
    public async getAllKeys(wildcard: string): Promise<any[]> {
        try {
            const result = await this.client.keys(`${wildcard}*`) 
            return result

        } catch (err) {
            throw new Error()
        }

    }
    public async getOne(key: string): Promise<string> {
        try {
            const result = await this.client.get(key)
            if (!result || result === null) throw new Error()
            return result
        } catch (err) {
            throw new Error()
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