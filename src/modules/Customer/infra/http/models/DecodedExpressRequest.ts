
import express from 'express';
import { JWTClaims } from "../../../domain/Jwt";

export interface DecodedExpressRequest extends express.Request {
  decoded: JWTClaims
}