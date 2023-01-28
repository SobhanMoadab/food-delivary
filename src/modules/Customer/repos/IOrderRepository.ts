import { Order } from "../domain/Order";

export interface IOrderRepository {
    save(order: Order): Promise<void>
    findById(orderId: string): Promise<Order>
    // exists(email: string): Promise<boolean>
    // list(): Promise<Order[]>
}