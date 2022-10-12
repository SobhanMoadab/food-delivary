import { DomainEvents } from "../../../shared/domain/events/DomainEvents";
import { IDomainEvent } from "../../../shared/domain/events/IDomainEvent";
import { IHandle } from "../../../shared/domain/events/IHandle";
import { ProductCreated } from "../domain/events/ProductCreated";



export class afterProductCreated implements IHandle<IDomainEvent> {

    private updateCategory: UpdateCategory

    constructor() {
        this.setupSubscriptions()
    }

    public setupSubscriptions(): void {
        DomainEvents.register()
    }

    private async onProductCreated(event: ProductCreated): Promise<void> {
        try {
            await this.updateCategory.execute()
        } catch (err) {
            console.log(`[AfterProductCreated]: Failed to update category for {${event.category.name}}`);
        }
    }
}