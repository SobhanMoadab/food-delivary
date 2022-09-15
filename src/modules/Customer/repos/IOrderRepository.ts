import { Order } from "../domain/Order";

export interface IOrderRepository {
    save(order: Order): Promise<void>
    // exists(email: string): Promise<boolean>
    // list(): Promise<Order[]>
}