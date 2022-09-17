import { BaseFakeRepo } from "../../../../shared/core/BaseFakeRepo";
import { Product } from "../../domain/product";
import { IProductRepository } from "../IProductRepository";

export class FakeProductRepo extends BaseFakeRepo<Product> implements Pick<IProductRepository, 'save'> {

    constructor() {
        super();
    }

    public async exists(product: Product): Promise<boolean> {
        const found = this._items.filter((i) => this.compareFakeItems(i, product));
        return found.length !== 0;
    }

    public find(id: string): Product | null {
        const matches = this._items.find((i) => i.props.id === id);
        return matches ?? null
    }

    public create(product: Product) {
        const alreadyExists = this.find(product.id);
        if (!alreadyExists) return
        this._items.push(alreadyExists)
    }
    public save(product: Product): Promise<void> {
        throw new Error()
    }

    public compareFakeItems(a: Product, b: Product): boolean {
        return a.id.equals(b.id);
    }
}