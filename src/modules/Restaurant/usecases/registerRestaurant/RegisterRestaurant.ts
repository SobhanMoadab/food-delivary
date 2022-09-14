/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { UnexpectedError } from '../../../../shared/core/AppError'
import { Either, left, Result, right } from '../../../../shared/core/Result'
import { UseCase } from '../../../../shared/core/UseCase'
import { Restaurant } from '../../domain/restaurant'
import { ICategoryRepository } from '../../repos/ICategoryRepository'
import { IRestaurantRepository } from '../../repos/IRestaurantRepository'
import { Category404 } from '../createCategory/CreateCategoryErrors'
import { RegisterRestaurantDTO } from './RegisterRestaurantDTO'

type Response = Either<
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class RegisterRestaurantUseCase implements UseCase<RegisterRestaurantDTO, Promise<Response>> {

    constructor(
        public categoryRepo: ICategoryRepository,
        public restaurantRepo: IRestaurantRepository
    ) { }

    public async execute(req: RegisterRestaurantDTO): Promise<Response> {
        console.log('helooooooooooooooo')

        let restaurant: Restaurant
        // let category: Category

        const dto = {
            name: req.name,
            city: req.city,
            ownerName: req.ownerName,
            ownerSurname: req.ownerSurname,
            phoneNumber: req.phoneNumber,
            // category: req.category
        }

        try {
            // try {
            //     category = await this.categoryRepo.findById(req.category)

            // } catch (err) {
            //     return left(new Category404())
            // }

            const restaurantOrError = Restaurant.create(dto)
            if (restaurantOrError.isFailure) {
                return left(restaurantOrError)
            }
            restaurant = restaurantOrError.getValue()
            await this.restaurantRepo.save(restaurant)
            return right(Result.ok<void>())

        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }

    }
}