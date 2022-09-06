import { Request, Response } from "express";

export abstract class BaseController {
    protected abstract executeImpl(req: Request, res: Response): Promise<void | any>

}