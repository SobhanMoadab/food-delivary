import { Model } from "mongoose";
import { Category, CategoryProps } from "../../domain/category";
import { CategoryMapper } from "../../mappers/CategoryMapper";
import { ICategoryRepository } from "../ICategoryRepository";


export class CategoryRepository implements ICategoryRepository {

    private _model: Model<CategoryProps>

    constructor(schemaModel: Model<CategoryProps>) {

        this._model = schemaModel;
    }
    async save(props: Category): Promise<void> {
        const toPers = CategoryMapper.toPersistence(props)
        await this._model.create(toPers)
        return
    }

    async findById(id: string): Promise<Category> {
        const category = await this._model.findById(id)
        if (!category) throw new Error()
        if (category?.products) return CategoryMapper.toDomain({ ...category, products: [] })
        else return CategoryMapper.toDomain({ ...category })
    }
}