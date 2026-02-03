import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginRequest {
	@ApiProperty({
		description: 'User email address',
		example: '123abc@gmail.com'
	})
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email field is required' })
	public email: string

	@ApiProperty({
		description: 'Password',
		example: '123456abc',
		minLength: 6,
		maxLength: 128
	})
	@IsNotEmpty({ message: 'Password field is required' })
	@IsString({ message: 'Password must be a string' })
	@MinLength(6)
	@MaxLength(128)
	public password: string
}