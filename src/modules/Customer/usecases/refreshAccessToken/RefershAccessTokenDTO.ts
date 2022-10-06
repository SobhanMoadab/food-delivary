import { RefreshToken } from "../../domain/Jwt";



export interface RefreshAccessTokenDTO {
    refreshToken: RefreshToken;
}