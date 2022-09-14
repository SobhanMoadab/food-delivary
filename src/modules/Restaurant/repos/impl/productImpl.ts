import { Model } from "mongoose";
import { Product, ProductProps } from "../../domain/product";
import { IProductRepository } from "../IProductRepository";


export class ProductRepository implements IProductRepository {

    private _model: Model<ProductProps>

    constructor(schemaModel: Model<ProductProps>) {

        this._model = schemaModel;
    }
    async save(props: Product): Promise<void> {
        await this._model.create({
            category: props.category,
            discountedFee: props.discountedFee,
            fee: props.fee,
            name: props.name,
            recipe: props.recipe
        })
        return
    }


}