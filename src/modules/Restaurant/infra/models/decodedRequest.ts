
import express from 'express';
import { JWTClaims } from "../../../Customer/domain/Jwt";

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}