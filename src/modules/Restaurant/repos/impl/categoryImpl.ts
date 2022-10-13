import { Model } from "mongoose";
import { Category, CategoryProps } from "../../domain/category";
import { CategoryMapper } from "../../mappers/categoryMapper";
import { ICategoryRepository } from "../ICategoryRepository";


export class CategoryRepository implements ICategoryRepository {

    private _model: Model<CategoryProps>

    constructor(schemaModel: Model<CategoryProps>) {

        this._model = schemaModel;
    }

    async exists(id: string): Promise<boolean> {
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }

    async save(category: Category): Promise<void> {
        const exists = await this.exists(category.categoryId.id.toString())
        const isNew = !exists
        const toPers = CategoryMapper.toPersistence(category)

        if (isNew) {
            await this._model.create(toPers)
            return
        // } else {
            
        //     await this._model.findByIdAndUpdate(category.categoryId.id.toString(),{
        //         $push : {
        //             products: 
        //         }
        //     })
        }

    }

    async findById(id: string): Promise<Category> {
        const category = await this._model.findById(id)
        if (!category) throw new Error()
        if (category?.products) return CategoryMapper.toDomain({ ...category, products: [] })
        else return CategoryMapper.toDomain({ ...category })
    }
}