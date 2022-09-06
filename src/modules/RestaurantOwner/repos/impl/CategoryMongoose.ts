import { Model } from "mongoose";
import { Category, CategoryProps } from "../../domain/Category/Category";
import { ICategoryRepository } from "../ICategoryRepository";


export class CategoryRepository implements ICategoryRepository {

    private _model: Model<CategoryProps>

    constructor(schemaModel: Model<CategoryProps>) {

        this._model = schemaModel;
    }
    async save(props: Category): Promise<void> {
        await this._model.create(props)
    }


}