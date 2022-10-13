
import { WatchedList } from "../../../shared/domain/WatchedlList";
import { Category } from "./category";

export class Categories extends WatchedList<Category> {
    private constructor(initialCategories: Category[]) {
        super(initialCategories)
    }

    public compareItems(a: Category, b: Category): boolean {
        return a.equals(b)
    }

    public static create(categories?: Category[]): Categories {
        return new Categories(categories ? categories : []);
    }
}