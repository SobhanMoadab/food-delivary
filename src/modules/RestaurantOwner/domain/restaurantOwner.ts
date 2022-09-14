/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guard } from "../../../shared/core/Guard";
import { left, Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { RestaurantCreated } from "./events/restaurantCreated";
import { Product } from "./product";


export interface RestaurantOwnerProps {
    name: string
    city: string
    ownerName: string
    ownerSurname: string
    phoneNumber: number
    products?: Product[]
    category: Category
}

export class RestaurantOwner extends AggregateRoot<RestaurantOwnerProps> {
    constructor(props: RestaurantOwnerProps, id?: UniqueEntityID) {
        super(props, id)
    }
    get id(): UniqueEntityID {
        return this._id
    }
    get name(): string {
        return this.props.name
    }
    get city(): string {
        return this.props.city
    }
    get ownerName(): string {
        return this.props.ownerName
    }
    get ownerSurname(): string {
        return this.props.ownerSurname
    }
    get phoneNumber(): number {
        return this.props.phoneNumber
    }
    get products(): Product[] {

        return this.props.products ?? []
    }
    get category(): Category {
        return this.props.category
    }

    public static create(props: RestaurantOwnerProps, id?: UniqueEntityID): Result<RestaurantOwner> {

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.city, argumentName: 'city' },
            { argument: props.category, argumentName: 'category' },
            { argument: props.ownerName, argumentName: 'ownerName' },
            { argument: props.ownerSurname, argumentName: 'ownerSurname' },
            { argument: props.phoneNumber, argumentName: 'phoneNumber' }
        ])

        if (guardResult.isFailure) {
            return Result.fail<RestaurantOwner>(guardResult.getErrorValue())
        }
        const restaurantOwner = new RestaurantOwner({ ...props })
        restaurantOwner.addDomainEvent(new RestaurantCreated(restaurantOwner))

        return Result.ok<RestaurantOwner>(restaurantOwner)
    }
}