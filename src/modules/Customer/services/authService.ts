import { Customer } from "../domain/Customer";
import { JWTClaims, JWTToken, RefreshToken } from "../domain/Jwt";


export interface IAuthService {
    signJWT(props: JWTClaims): JWTToken;
    decodeJWT(token: string): JWTClaims;
    createRefreshToken(): RefreshToken;
    getTokens(userId: string): Promise<string[]>;
    saveAuthenticatedCustomer(customer: Customer): Promise<void>;
    // deAuthenticateUser(username: string): Promise<void>;
    // refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
    getEmailFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}