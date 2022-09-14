import { Customer } from "../domain/Customer";
import { JWTClaims, JWTToken, RefreshToken } from "../domain/jwt";


export interface IAuthService {
    signJWT(props: JWTClaims): JWTToken;
    // decodeJWT(token: string): Promise<JWTClaims>;
    createRefreshToken(): RefreshToken;
    // getTokens(username: string): Promise<string[]>;
    saveAuthenticatedCustomer(customer: Customer): Promise<void>;
    // deAuthenticateUser(username: string): Promise<void>;
    // refreshTokenExists(refreshToken: RefreshToken): Promise<boolean>;
    // getUserNameFromRefreshToken(refreshToken: RefreshToken): Promise<string>;
}