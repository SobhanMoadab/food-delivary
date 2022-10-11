import { mock } from "jest-mock-extended"
import { ICustomerRepository } from "../../repos/ICustomerRepository"
import { IAuthService } from "../../services/authService"
import { RefreshAccessToken } from "../../usecases/refreshAccessToken/RefershAccessToken"
import { RefreshAccessTokenDTO } from "../../usecases/refreshAccessToken/RefershAccessTokenDTO"
import * as crypto from 'crypto'
import { Either, Result } from "../../../../shared/core/Result"
import { UnexpectedError } from "../../../../shared/core/AppError"
import * as jwt from 'jsonwebtoken'
import { Customer } from "../../domain/Customer"

/*
Feature: Refresh access token
  Scenario: User requests for refresh token
    Given I have refresh token
    When I Want a new refresh token
    Then I should get a new one
*/

type Response = Either<
  UnexpectedError |
  Result<any>,
  Result<void>
>



describe('Refersh access Token', () => {
  let customerRepo: ICustomerRepository
  let authService: IAuthService
  let useCase: RefreshAccessToken
  let req: RefreshAccessTokenDTO
  let customer: Customer
  let accessToken: string

  beforeEach(() => {

    accessToken = jwt.sign({ userId: '1', email: 'test@test.com' }, '123456789!')

    customer = Customer.create({
      address: 'test',
      email: 'test@test.com',
      phoneNumber: 33995599,
      name: 'sobhan',
    }).getValue()

    customerRepo = {
      exists: jest.fn(),
      getCustomerByEmail: jest.fn().mockReturnValueOnce(customer),
      list: jest.fn(),
      save: jest.fn()
    }

    authService = {
      createRefreshToken: jest.fn(),
      getEmailFromRefreshToken: jest.fn().mockReturnValueOnce({ email: 'test@test.com' }),
      saveAuthenticatedCustomer: jest.fn(),
      signJWT: jest.fn().mockReturnValueOnce(accessToken),
      decodeJWT: jest.fn()
    }

    useCase = new RefreshAccessToken(customerRepo, authService)
    req = {
      refreshToken: crypto.randomBytes(20).toString('hex')
    }
    
  })


  it('should execute refresh access token with success', async () => {
    /* get customer from email
     */


    const result = await useCase.execute(req)
    expect(result.isRight()).toBeTruthy()
    expect(result.value).toBeTruthy()
  })



})

