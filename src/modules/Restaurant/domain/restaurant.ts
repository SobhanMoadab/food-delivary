/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectId } from "mongodb";
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Categories } from "./categories";
import { FoodCreated } from "./events/FoodCreated";
import { Food } from "./food";
import { Foods } from "./foods";
import { RestaurantId } from "./RestaurantId";


export interface RestaurantProps {
    name: string
    city: string
    ownerName: string
    ownerSurname: string
    phoneNumber: string
    foods?: Foods
    rating?: number
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
    get foods(): Foods {
        return this.props.foods ?? Foods.create()
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

    public addFood(food: Food): Result<void> {
        if(!this.props.foods){
            this.props.foods = Foods.create()
        }
        this.props.foods.add(food);
        this.addDomainEvent(new FoodCreated(this, food));
        return Result.ok<void>();
    }
}