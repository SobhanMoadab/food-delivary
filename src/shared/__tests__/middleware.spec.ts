import { IAuthService } from "../../modules/Customer/services/authService"
import { Middleware } from "../infra/http/utils/Middleware"
import * as jwt from 'jsonwebtoken'
import { mock } from 'jest-mock-extended'
import { NextFunction, Request, Response } from "express"




describe('Middleware', () => {

    let middleware: Middleware
    let authService: IAuthService
    let response: any
    let request: any
    let next: NextFunction
    let spy: any

    beforeEach(() => {
        jest.restoreAllMocks();
        request = {
            headers: {
                authorization: ''
            }
        }
        response = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn().mockReturnValueOnce({
                message: 'test',
                code: 400
            })
        }

        authService = {
            createRefreshToken: jest.fn(),
            getEmailFromRefreshToken: jest.fn().mockReturnValueOnce({ email: 'test@test.com' }),
            saveAuthenticatedCustomer: jest.fn(),
            signJWT: jest.fn(),
            decodeJWT: jest.fn()
        }
        middleware = new Middleware(authService)
        spy = jest.spyOn(middleware, 'endRequest');
    })

    /* if i provide no token it should throw error */
    it('should end request if token does not exists', async () => {
        await middleware.ensureAuthenticated(request, response, next)
        expect(spy).toHaveBeenCalledTimes(1)
    })

})