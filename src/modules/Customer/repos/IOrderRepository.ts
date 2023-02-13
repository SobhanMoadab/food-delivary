import { Order } from "../domain/Order";

export interface IOrderRepository {
    save(order: Order): Promise<void>
    findById(orderId: string): Promise<Order>
    exists(id: string): Promise<boolean>
}