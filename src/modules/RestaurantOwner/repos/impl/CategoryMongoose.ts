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
        await this._model.create(props)
    }

    async findById(id: string): Promise<Category> {
        const category = await this._model.findById(id)
        return CategoryMapper.toDomain(category)
    }
}