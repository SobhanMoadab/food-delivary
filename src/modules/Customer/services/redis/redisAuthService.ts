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

    public async addToken(username: string, refreshToken: RefreshToken, token: JWTToken): Promise<any> {
        return this.set(this.constructKey(username, refreshToken), token);
    }
    public async saveAuthenticatedCustomer(customer: Customer): Promise<void> {
        if (customer.isLoggedIn()) {
            await this.addToken(customer.email, customer.refreshToken ?? this.createRefreshToken(), customer.accessToken ?? '');
        }
    }
}