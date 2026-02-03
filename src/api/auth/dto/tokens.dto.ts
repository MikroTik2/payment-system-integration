import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class TokensResponse {
	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNlNWNhOGQ2MTE3OTM4ZMZ1ODVhYzciLCJlbWFpbCI6IlZsYSRAZ21haWwxLmNvbSIsImlhdCI6MTcxNTQ1NjA4OSwiZXhwIjoxNzE2MDYwODg5fQ.AaHdG7qL3CciSQI82lTLWM7MHhR43tKTgFoWEOuYtvY'
	})
	@IsNotEmpty({ message: 'Access Token field is required' })
	@IsString({ message: 'Access Token must be a string' })
	public accessToken: string

	@ApiProperty({
		example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjNlNWNhOGQ2MTE3OTM4ZMZ1ODVhYzciLCJlbWFpbCI6IlZsYSRAZ21haWwxLmNvbSIsImlhdCI6MTcxNTQ1NjA4OSwiZXhwIjoxNzE2MDYwODg5fQ.AaHdG7qL3CciSQI82lTLWM7MHhR43tKTgFoWEOuYtvY'
	})
	@IsNotEmpty({ message: 'Refresh Token field is required' })
	@IsString({ message: 'Refresh Token must be a string' })
	public refreshToken: string
}