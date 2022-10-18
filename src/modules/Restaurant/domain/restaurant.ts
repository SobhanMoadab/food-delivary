/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Categories } from "./categories";
import { Category } from "./category";
import { ProductCreated } from "./events/ProductCreated";
import { RestaurantCreated } from "./events/restaurantCreated";
import { Food } from "./food";
import { Products } from "./foods";
import { RestaurantId } from "./RestaurantId";


export interface RestaurantProps {
    name: string
    city: string
    ownerName: string
    ownerSurname: string
    phoneNumber: number
    products?: Products
    categories?: Categories
}

export class Restaurant extends AggregateRoot<RestaurantProps> {
    constructor(props: RestaurantProps, id?: UniqueEntityID) {
        super(props, id)
    }
    get restaurantId(): RestaurantId {
        return RestaurantId.create(this._id).getValue()
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
    get products(): Products {
        return this.props.products!
    }
    get categories(): Categories {
        return this.props.categories!
    }

    public static create(props: RestaurantProps): Result<Restaurant> {

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