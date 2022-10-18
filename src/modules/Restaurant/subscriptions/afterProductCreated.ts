import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ProductCreated } from "../domain/events/ProductCreated";
import { UpdateCategory } from "../usecases/updateCategory/UpdateCategory";



export class afterProductCreated implements IHandle<IDomainEvent> {

    private updateCategory: UpdateCategory

    constructor(updateCategory: UpdateCategory) {
        this.setupSubscriptions()
        this.updateCategory = updateCategory
    }

    public setupSubscriptions(): void {
        // DomainEvents.register()
    }

    private async onProductCreated(event: ProductCreated): Promise<void> {
        try {
            await this.updateCategory.execute({ categoryId: event.product.categoryId.id.toString() })
        } catch (err) {
            console.log(`[AfterProductCreated]: Failed to update Category for {${event.category.name}}`);
        }
    }
}