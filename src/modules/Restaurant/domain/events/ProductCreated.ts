import { IDomainEvent } from "../../../../shared/domain/events/IDomainEvent";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";
import { Category } from "../category";
import { Product } from "../product";
import { Restaurant } from "../restaurant";


export class ProductCreated implements IDomainEvent {

    public dateTimeOccurred: Date;

    constructor(
        public category: Category,
        public product: Product

    ) {
        this.dateTimeOccurred = new Date()
    }

    getAggregateId(): UniqueEntityID {
        return this.category.categoryId.id;
    }
}