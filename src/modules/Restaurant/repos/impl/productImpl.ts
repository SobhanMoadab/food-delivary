import { Model } from "mongoose";
import { Product, ProductProps } from "../../domain/product";
import { ProductMapper } from "../../mappers/productMapper";
import { IProductRepository } from "../IProductRepository";


export class ProductRepository implements IProductRepository {

    private _model: Model<ProductProps>

    constructor(schemaModel: Model<ProductProps>) {

        this._model = schemaModel;
    }
    async saveBulk(products: Product[]): Promise<void> {
        for (let product of products){
            await this.save(product)
        }
    }
    async save(props: Product): Promise<void> {
        const toPers = ProductMapper.toPersistence(props)
        await this._model.create(toPers)
        return
    }
    async findById(id: string): Promise<Product> {
        const product = await this._model.findById(id)
        if (!product) throw new Error()
        return ProductMapper.toDomain({ ...product })
    }

}