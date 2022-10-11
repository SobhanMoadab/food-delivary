import { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../../../modules/Customer/services/authService";


export class Middleware {

    constructor(public authService: IAuthService) { }

    public endRequest(status: 400 | 401 | 403, message: string, res: Response) {
        return res.status(status).send({ message })
    }
    public async ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization']
        if (!token) {
            return this.endRequest(403, 'Token does not exists', res)
        }
    }
}