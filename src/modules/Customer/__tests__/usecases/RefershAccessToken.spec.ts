import { mock } from "jest-mock-extended"
import { ICustomerRepository } from "../../repos/ICustomerRepository"
import { IAuthService } from "../../services/authService"
import { RefreshAccessToken } from "../../usecases/refreshAccessToken/RefershAccessToken"
import { RefreshAccessTokenDTO } from "../../usecases/refreshAccessToken/RefershAccessTokenDTO"
import * as crypto from 'crypto'
import { Either, Result } from "../../../../shared/core/Result"
import { UnexpectedError } from "../../../../shared/core/AppError"


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

  beforeEach(() => {

    customerRepo = mock<ICustomerRepository>()
    authService = mock<IAuthService>()
    useCase = new RefreshAccessToken(customerRepo, authService)
    req = {
      refreshToken: crypto.randomBytes(20).toString('hex')
    }
  })


  it('should execute refresh access token with success', async () => {
    const { refreshToken } = req

    const result = await useCase.execute(req)
    expect(result.isRight()).toBeTruthy()
  })

  

})

