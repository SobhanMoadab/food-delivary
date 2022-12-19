import { Model } from "mongoose";
import { Category, CategoryProps } from "../../domain/category";
import { CategoryId } from "../../domain/categoryId";
import { Foods } from "../../domain/foods";
import { CategoryMapper } from "../../mappers/categoryMapper";
import { ICategoryRepository } from "../ICategoryRepository";
import { IFoodRepository } from "../IFoodRepository";


export class CategoryRepository implements ICategoryRepository {

    private _model: Model<CategoryProps>
    private foodRepo: IFoodRepository

    constructor(schemaModel: Model<CategoryProps>, foodRepo: IFoodRepository) {
        this.foodRepo = foodRepo
        this._model = schemaModel
    }

    async exists(categoryId: CategoryId): Promise<boolean> {
        const id = categoryId.id.toString()
        const founded = await this._model.findById(id)
        if (founded) return true
        else return false
    }
    // private async saveFoods(foods: Foods) {
    //     return this.foodRepo.saveBulk(products.getItems())
    // }

    async save(category: Category): Promise<void> {

        // const exists = await this.exists(category.categoryId)
        // const isNew = !exists
        // const toPers = CategoryMapper.toPersistence(category)
        // if (isNew) {
        //     await this._model.create(toPers)
        //     // await this.saveProducts(category.products)
        //     return
        // } else {
        //     // await this.saveProducts(category.products)
        //     await this._model.findByIdAndUpdate(category.categoryId.id.toString(), toPers)
        // }

    }

    async findById(id: string): Promise<Category> {
        const category = await this._model.findById(id).populate({
            path: 'products',
            model: 'Product'
        }).lean()
        if (!category) throw new Error()
        else return CategoryMapper.toDomain({ ...category })
    }
    async getCategoriesOfRestaurant(restaurantId: string): Promise<Category[]> {
        const categories = await this._model.find({ restaurantId }).populate({ path: 'products', model: 'Product' })
        if (!categories) throw new Error()
        return categories.map(c => CategoryMapper.toDomain(c))

    }
}