/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guard } from "../../../shared/core/Guard";
import { left, Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Category } from "./category";
import { RestaurantCreated } from "./events/restaurantCreated";
import { Product } from "./product";


export interface RestaurantProps {
    name: string
    city: string
    ownerName: string
    ownerSurname: string
    phoneNumber: number
    products?: Product[]
    categories?: Category[]
}

export class Restaurant extends AggregateRoot<RestaurantProps> {
    constructor(props: RestaurantProps, id?: UniqueEntityID) {
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
    get categories(): Category[] {
        return this.props.categories ?? []
    }

    public static create(props: RestaurantProps, id?: UniqueEntityID): Result<Restaurant> {

        const guardResult = Guard.againstNullOrUndefinedBulk([
            { argument: props.name, argumentName: 'name' },
            { argument: props.city, argumentName: 'city' },
            { argument: props.ownerName, argumentName: 'ownerName' },
            { argument: props.ownerSurname, argumentName: 'ownerSurname' },
            { argument: props.phoneNumber, argumentName: 'phoneNumber' }
        ])

        if (guardResult.isFailure) {
            return Result.fail<Restaurant>(guardResult.getErrorValue())
        }
        const restaurant = new Restaurant({ ...props })

        return Result.ok<Restaurant>(restaurant)
    }
}