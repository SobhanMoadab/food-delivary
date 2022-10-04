import { ObjectID } from "bson";
import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Restaurant } from "../restaurant";


export class RestaurantCreated implements IDomainEvent {
    
    public dateTimeOccurred: Date = new Date();

    constructor(public restaurant: Restaurant) { }
 
}