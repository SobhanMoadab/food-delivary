
import { WatchedList } from "../../../shared/domain/WatchedlList";
import { Category } from "./category";
import { Product } from "./product";

export class Categories extends WatchedList<Product> {
    private constructor(initialVotes: Product[]) {
        super(initialVotes)
    }

    public compareItems(a: Product, b: Product): boolean {
        return a.equals(b)
    }

    public static create(categories?: Category[]): Categories {
        return new Categories(categories ? categories : []);
    }
}