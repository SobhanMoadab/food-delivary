
import { WatchedList } from "../../../shared/domain/WatchedlList";
import { Product } from "./product";

export class Products extends WatchedList<Product> {
    private constructor(initialVotes: Product[]) {
        super(initialVotes)
    }

    public compareItems(a: Product, b: Product): boolean {
        return a.equals(b)
    }

    public static create(products?: Product[]): Products {
        return new Products(products ? products : []);
    }
}