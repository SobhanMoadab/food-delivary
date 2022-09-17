import { Request } from "express";

export declare interface Req extends Request {
    query: any
}