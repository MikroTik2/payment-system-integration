import { IsString, IsNumber } from 'class-validator'

export class RedisValidator {
	@IsString()
	REDIS_USER: string

	@IsString()
	REDIS_PASSWORD: string

	@IsString()
	REDIS_HOST: string

	@IsNumber()
	REDIS_PORT: number

	@IsString()
	REDIS_URI: string
}