import { Entity } from "../../../../shared/domain/Entity";
import { UniqueEntityID } from "../../../../shared/domain/UniqueEntityID";


interface ProductProps {
    id?: string,
    name: string,
    fee: number,
    recipe: string,
    discountedFee: number
}

export class Product extends Entity<ProductProps> {

    constructor(props: ProductProps, id?: UniqueEntityID) {
        super(props)
    }

    
}