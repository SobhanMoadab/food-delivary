import { UniqueEntityID } from "../../../shared/domain/UniqueEntityID";

export interface JWTClaims {
  userId: UniqueEntityID;
  // isEmailVerified: boolean;
  email: string;
  // username: string;
  // adminUser: boolean;
}

export type JWTToken = string;

export type SessionId = string;

export type RefreshToken = string;