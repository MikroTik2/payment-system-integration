import { IsString } from 'class-validator'

export class JwtValidator {
	@IsString()
	JWT_SECRET: string
}