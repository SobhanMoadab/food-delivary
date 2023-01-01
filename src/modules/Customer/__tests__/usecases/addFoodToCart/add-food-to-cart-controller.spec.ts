import request from 'supertest'
import { app } from '../../../../../shared/infra/http/app'
import { AddFoodToCartDTO } from '../../../usecases/addFoodToCart/AddFoodToCartDTO'


describe('POST add food to cart endpoint', () => {

    const url = '/api/v1/customers/increment-cart'

   

    it('should respond with 400 if foodId does not exists', async () => {
        // const conditionObject: AddFoodToCartDTO = {
        //     foodId: '',
        //     userId: 'test'
        // }
        // const result = await request(app).post(url)
        // expect(result.statusCode).toBe(400)
    })

    it('should respond with 201 if food exists', async () => {
        // const conditionObject: AddFoodToCartDTO = {
        //     foodId: 'foodId',
        //     userId: 'test'
        // }

        // const result = await request(app).post(url)
        //     .send(conditionObject)
        // expect(result.statusCode).toBe(201)
    })

})