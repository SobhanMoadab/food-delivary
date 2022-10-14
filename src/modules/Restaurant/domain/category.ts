/* eslint-disable @typescript-eslint/no-unused-vars */
import { Guard } from "../../../shared/core/Guard";
import { Result } from "../../../shared/core/Result";
import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";
import { Product } from "./product";
import { CategoryId } from "./categoryId";
import { Products } from "./products";
import { ProductCreated } from "./events/ProductCreated";
import { Entity } from "../../../shared/domain/Entity";
import { RestaurantId } from "./RestaurantId";


export interface CategoryProps {
    name: string
    restaurantId: RestaurantId
    products?: Products
}

export class Category extends AggregateRoot<CategoryProps> {

    constructor(props: CategoryProps, id?: UniqueEntityID) {
        super(props, id)
    }
    get categoryId(): CategoryId {
        return CategoryId.create(this._id).getValue()
    }
    get name(): string {
        return this.props.name
    }

    get products(): Products {
        return this.props.products ?? Products.create()
    }

    get restaurantId(): RestaurantId {
        return this.props.restaurantId
    }

    public static create(props: CategoryProps, id?: UniqueEntityID): Result<Category> {
        const nullGuard = Guard.againstNullOrUndefined(props.name, 'Name')

        if (nullGuard.isFailure) {
            return Result.fail<Category>(nullGuard.getErrorValue())
        } else {
            const newCategory = new Category(props, id)
            return Result.ok<Category>(newCategory)
        }
    }

    public addProduct(product: Product): Result<void> {

        this.props.products = Products.create()
        this.props.products.add(product)
        console.log({ 545555: this.props.products.getItems() })
        this.addDomainEvent(new ProductCreated(this, product));
        return Result.ok<void>();
    }


}