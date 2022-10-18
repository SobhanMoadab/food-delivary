import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Food } from "../food";
import { Restaurant } from "../restaurant";


export class FoodCreated implements IDomainEvent {

    public dateTimeOccurred: Date;

    constructor(
        public restaurant: Restaurant,
        public food: Food

    ) {
        this.dateTimeOccurred = new Date()
    }

    getAggregateId(): UniqueEntityID {
        return this.restaurant.restaurantId.id;
    }
}