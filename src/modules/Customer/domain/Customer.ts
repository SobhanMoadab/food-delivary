/* eslint-disable no-var */
import { Guard } from "../../../shared/core/Guard";
import { left, Result } from "../../../shared/core/Result";
import { Entity } from "../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { JWTToken, RefreshToken } from "./jwt";

export interface CustomerProps {
    id?: string,
    name: string,
    phoneNumber: number,
    email: string,
    address: string,
    accessToken?: JWTToken;
    refreshToken?: RefreshToken;
}

export class Customer extends Entity<CustomerProps> {

    constructor(props: CustomerProps) {
        super(props)
    }
    get id(): UniqueEntityID {
        return this._id
    }
    get phoneNumber(): number {
        return this.props.phoneNumber
    }
    get accessToken(): string | undefined {
        if (this.props.accessToken) {
            return this.props.accessToken;
        }
    }
    get refreshToken(): RefreshToken | undefined {
        if (this.props.refreshToken) {
            return this.props.refreshToken;
        }
    }
    get email(): string {

        return this.props.email
    }
    get name(): string {

        return this.props.name
    }
    get address(): string {
        return this.props.address
    }
    private static isValidEmail(email: string) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    public static create({ address, email, name, phoneNumber }: CustomerProps, id?: UniqueEntityID): Result<Customer> {
        const nullGuard = Guard.againstNullOrUndefinedBulk([
            { argument: address, argumentName: 'address' },
            { argument: email, argumentName: 'email' },
            { argument: name, argumentName: 'name' },
            { argument: phoneNumber, argumentName: 'phoneNumber' },

        ])
        if (nullGuard.isFailure) {
            return Result.fail<Customer>(nullGuard.getErrorValue());
        }
        if (!this.isValidEmail(email)) {
            return Result.fail<Customer>('Email address is not valid')
        } else {
            const newCustomer = new Customer({ address, email, name, phoneNumber })
            return Result.ok<Customer>(newCustomer)
        }

    }

    public setAccessToken(token: JWTToken, refreshToken: RefreshToken): void {
        this.props.accessToken = token;
        this.props.refreshToken = refreshToken;
    }

    public isLoggedIn(): boolean {
        return !!this.props.accessToken && !!this.props.refreshToken
    }
}