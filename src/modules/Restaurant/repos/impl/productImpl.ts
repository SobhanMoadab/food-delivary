import { Model } from "mongoose";
import { Product, ProductProps } from "../../domain/food";
import { ProductId } from "../../domain/foodId";
import { ProductMapper } from "../../mappers/foodMapper";
import { IProductRepository } from "../IProductRepository";


export class ProductRepository implements IProductRepository {

    private _model: Model<ProductProps>

    constructor(schemaModel: Model<ProductProps>) {

        this._model = schemaModel;
    }

    async exists(productId: ProductId): Promise<boolean> {
        const id = productId.id.toString()
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }

    async saveBulk(products: Product[]): Promise<void> {
        for (let product of products) {
            await this.save(product)
        }
    }

    async save(product: Product): Promise<void> {
        const exists = await this.exists(product.categoryId)
        const isNew = !exists
        const toPers = ProductMapper.toPersistence(product)
        if (isNew) {
            await this._model.create(toPers)
            // await this.saveProducts(category.products)
            return
        } else {
            await this._model.findByIdAndUpdate(product.productId.id.toString(), toPers)
        }
    }
    async findById(id: string): Promise<Product> {
        const product = await this._model.findById(id)
        if (!product) throw new Error()
        return ProductMapper.toDomain({ ...product })
    }

    async getProductsByRestaurantId(restaurantId: string): Promise<Product[]> {
        const products = await this._model.find({ restaurantId }).lean()
        console.log({ 111: restaurantId })
        if (!products) throw new Error()
        return products.map(p => ProductMapper.toDomain(p))
    }
}