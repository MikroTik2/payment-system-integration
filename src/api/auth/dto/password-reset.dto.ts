import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class PasswordResetRequest {
	@ApiProperty({
		description: 'Reset token',
		example: 'abc123xyz'
	})
	@IsString({ message: 'Token must be a string' })
	@IsNotEmpty({ message: 'Token is required' })
	token: string

	@ApiProperty({
		description: 'New password',
		example: '123456',
		minLength: 6,
		maxLength: 128
	})
	@IsString({ message: 'Password must be a string' })
	@IsNotEmpty({ message: 'Password is required' })
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	@MaxLength(128, {
		message: 'Password must not exceed 128 characters'
	})
	password: string
}