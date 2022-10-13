import { ICategoryRepository } from "../../../repos/ICategoryRepository"
import { Category404 } from "../../../usecases/createCategory/CreateCategoryErrors"
import { UpdateCategory } from "../../../usecases/updateCategory/UpdateCategory"



describe('Update Category', () => {
    let useCase: UpdateCategory
    let categoryRepo: ICategoryRepository
    let mock: any

    // given no categoryId
    it('should return category not found error class', async () => {

        // const dto = {
        //     categoryId: ''
        // }
        // categoryRepo = {
        //     findById: jest.fn().mockImplementation(() => {
        //         throw new Error()
        //     }),
        //     save: jest.fn()
        // }
        // useCase = new UpdateCategory(categoryRepo)
        // const result = await useCase.execute(dto)
        // const value = result.value

        // console.log({ value })
        // expect(result.isRight()).toBeFalsy()
        // expect(value).toBeInstanceOf(Category404)

    })

    // given 
})