import { ApiProperty } from '@nestjs/swagger'

export class AuthResponse {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
		description: 'Access token used for authorization'
	})
	public accessToken: string
}