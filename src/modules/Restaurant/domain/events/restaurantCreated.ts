import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { RestaurantOwner } from "../restaurant";


export class RestaurantCreated implements IDomainEvent {

    public dateTimeOccurred: Date = new Date();
    
    constructor(public restaurantOwner: RestaurantOwner) { }

    getAggregateId(): UniqueEntityID {
        return this.restaurantOwner.id
    }
}