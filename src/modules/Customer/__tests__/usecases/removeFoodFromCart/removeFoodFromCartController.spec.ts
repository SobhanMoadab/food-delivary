import { RemoveFoodFromCartController } from "../../../usecases/removeFoodFromCart/RemoveFoodFromCartController"
import request from 'supertest'
import { RemoveFoodFromCart } from "../../../usecases/removeFoodFromCart/RemoveFoodFromCart"
import { app } from '../../../../../shared/infra/http/app'

describe('remove food from cart endpoint', () => {

    it('should respond with 201', async () => {
        const result = await request(app).post('/api/v1/customers/remove-cart')
        expect(result.statusCode).toBe(201)
    })
})