import { JWTToken, RefreshToken } from "../../domain/Jwt"

export interface RegisterDTO {
    name: string,
    phoneNumber: string,
    email: string,
    address: string
}

export interface RegisterResponse {
    accessToken: JWTToken
    refreshToken: RefreshToken
}