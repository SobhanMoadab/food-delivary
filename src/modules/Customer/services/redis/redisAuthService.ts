/* eslint-disable @typescript-eslint/no-inferrable-types */
import { JWTClaims, JWTToken, RefreshToken } from "../../domain/Jwt";
import { IAuthService } from "../authService";
import randtoken from 'rand-token'
import { AbstractRedisClient } from "./redisAbstractClient";
import { RedisClientType } from "@redis/client";
import * as jwt from 'jsonwebtoken'
import { Customer } from "../../domain/Customer";

export class RedisAuthService extends AbstractRedisClient implements IAuthService {

    public jwtHashName: string = 'activeJwtClients';

    constructor(redisClient: RedisClientType) {
        super(redisClient)
    }
    public decodeJWT(token: string): JWTClaims {
        const result = jwt.verify(token, '123456789!')
        return result as JWTClaims
    }

    public async getTokens(userId: string): Promise<string[]> {
        const keyValue = await this.getAllKeys(`*${this.jwtHashName}.${userId}`)
        return keyValue.map(kv => kv.value)
    }

    public async getEmailFromRefreshToken(refreshToken: string): Promise<string> {
        const keys = await this.getAllKeys(`*${refreshToken}`)
        const exists = keys.length !== 0
        if (!exists) throw new Error("Username not found for refresh token.");
        const key = keys[0];
        return key.substring(key.indexOf(this.jwtHashName) + this.jwtHashName.length + 1)

    }

    public createRefreshToken(): RefreshToken {
        return randtoken.uid(256) as RefreshToken
    }


    public signJWT(props: JWTClaims): JWTToken {
        const claims: JWTClaims = {
            email: props.email,
            userId: props.userId,
        };

        return jwt.sign(claims, '123456789!', {
            expiresIn: 300
        });
    }
    private constructKey(username: string, refreshToken: RefreshToken): string {
        return `refresh-${refreshToken}.${this.jwtHashName}.${username}`
    }

    public addToken(username: string, refreshToken: RefreshToken, token: JWTToken): Promise<any> {

        return this.set(this.constructKey(username, refreshToken), token);
    }
    public async saveAuthenticatedCustomer(customer: Customer): Promise<void> {
        if (customer.isLoggedIn()) {
            await this.addToken(customer.email, customer.refreshToken!, customer.accessToken!);
        }
    }
}