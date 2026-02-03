import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class SendPasswordResetRequest {
	@ApiProperty({
		description: 'User email address',
		example: '123abc@gmail.com'
	})
	@IsEmail({}, { message: 'Invalid email format' })
	@IsNotEmpty({ message: 'Email field is required' })
	public email: string
}