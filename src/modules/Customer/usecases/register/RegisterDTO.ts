import { JWTToken, RefreshToken } from "../../domain/Jwt"

export interface RegisterDTO {
    name: string,
    phoneNumber: number,
    email: string,
    address: string
}

export interface RegisterResponse {
    accessToken: JWTToken
    refreshToken: RefreshToken
}