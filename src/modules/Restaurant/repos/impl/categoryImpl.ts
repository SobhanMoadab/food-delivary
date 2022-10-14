import { Model } from "mongoose";
import { Category, CategoryProps } from "../../domain/category";
import { CategoryId } from "../../domain/categoryId";
import { Products } from "../../domain/products";
import { CategoryMapper } from "../../mappers/categoryMapper";
import { ICategoryRepository } from "../ICategoryRepository";
import { IProductRepository } from "../IProductRepository";


export class CategoryRepository implements ICategoryRepository {

    private _model: Model<CategoryProps>
    private productRepo: IProductRepository

    constructor(schemaModel: Model<CategoryProps>, productRepo: IProductRepository) {
        this.productRepo = productRepo
        this._model = schemaModel
    }

    async exists(categoryId: CategoryId): Promise<boolean> {
        const id = categoryId.id.toString()
        console.log({ id })
        const founded = await this._model.findById(id)
        console.log({ founded })
        if (founded) return true
        else return false
    }
    private async saveProducts(products: Products) {
        console.log({ products })
        return this.productRepo.saveBulk(products.getItems())
    }

    async save(category: Category): Promise<void> {

        const exists = await this.exists(category.categoryId)
        const isNew = !exists
        const toPers = CategoryMapper.toPersistence(category)
        if (isNew) {
            await this._model.create(toPers)
            // await this.saveProducts(category.products)
            return
        } else {
            await this.saveProducts(category.products)
            await this._model.findByIdAndUpdate(category.categoryId.id.toString(), toPers)
        }

    }

    async findById(id: string): Promise<Category> {
        const category = await this._model.findById(id).populate({
            path: 'products',
            model: 'Product'
        }).lean()
        if (!category) throw new Error()
        else return CategoryMapper.toDomain({ ...category })
    }
}