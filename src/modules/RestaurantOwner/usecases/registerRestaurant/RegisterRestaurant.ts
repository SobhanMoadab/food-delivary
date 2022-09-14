/* eslint-disable no-empty */
import { UnexpectedError } from '../../../../shared/core/AppError'
import { Either, left, Result, right } from '../../../../shared/core/Result'
import { UseCase } from '../../../../shared/core/UseCase'
import { Category } from '../../domain/category'
import { RestaurantOwner } from '../../domain/restaurantOwner'
import { ICategoryRepository } from '../../repos/ICategoryRepository'
import { IRestaurantRepository } from '../../repos/IRestaurantOwnerRepository'
import { Category404 } from '../createCategory/CreateCategoryErrors'
import { RegisterRestaurantDTO } from './RegisterRestaurantDTO'

type Response = Either<
    Category404 |
    UnexpectedError |
    Result<any>,
    Result<void>
>


export class RegisterUseCase implements UseCase<RegisterRestaurantDTO, Promise<Response>> {

    constructor(
        public categoryRepo: ICategoryRepository,
        public restaurantRepo: IRestaurantRepository
    ) { }

    public async execute(req: RegisterRestaurantDTO): Promise<Response> {

        let resOwner: RestaurantOwner
        let category: Category

        const dto = {
            name: req.name,
            city: req.city,
            ownerName: req.ownerName,
            ownerSurname: req.ownerSurname,
            phoneNumber: req.phoneNumber,
            category: req.category
        }

        try {
            try {
                category = await this.categoryRepo.findById(req.category)

            } catch (err) {
                return left(new Category404())
            }

            const resOwnerOrError = RestaurantOwner.create({ ...dto, category })
            if (resOwnerOrError.isFailure) {
                return left(resOwnerOrError)
            }
            resOwner = resOwnerOrError.getValue()
            await this.restaurantRepo.save(resOwner)
            return right(Result.ok<void>())

        } catch (err) {
            return left(new UnexpectedError(err)) as Response;
        }

    }
}