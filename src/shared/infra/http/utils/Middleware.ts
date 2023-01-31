import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../../../modules/Customer/services/authService";


export class Middleware {

    constructor(public authService: IAuthService) { }

    public endRequest(status: 400 | 401 | 403, message: string, res: Response) {
        return res.status(status).send({ message })
    }
    public ensureAuthenticated() {
        return async (req: any, res: Response, next: NextFunction) => {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                return this.endRequest(403, 'Token does not exists', res)
            }
            const decoded = this.authService.decodeJWT(token)
            if (!decoded) {
                return this.endRequest(403, 'Token does not exists', res)
            }

            const { userId } = decoded
            const tokens = await this.authService.getTokens(userId)
            if (tokens.length !== 0) {
                req.decoded = decoded
                return next();
            } else {
                return next()
            }
        }
    }
}