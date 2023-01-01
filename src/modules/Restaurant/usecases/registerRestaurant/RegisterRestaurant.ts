/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
import { UnexpectedError } from '../../../../shared/core/AppError'
import { Either, left, Result, right } from '../../../../shared/core/Result'
import { UseCase } from '../../../../shared/core/UseCase'
import { Restaurant } from '../../domain/restaurant'
import { IRestaurantRepository } from '../../repos/IRestaurantRepository'
import { RegisterRestaurantDTO } from './RegisterRestaurantDTO'

type Response = Either<
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class RegisterRestaurantUseCase implements UseCase<RegisterRestaurantDTO, Promise<Response>> {

    constructor(
        public restaurantRepo: IRestaurantRepository
    ) { }

    public async execute(req: RegisterRestaurantDTO): Promise<Response> {

        let restaurant: Restaurant

        const dto = {
            name: req.name,
            city: req.city,
            ownerName: req.ownerName,
            ownerSurname: req.ownerSurname,
            phoneNumber: req.phoneNumber,
        }

        try {
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