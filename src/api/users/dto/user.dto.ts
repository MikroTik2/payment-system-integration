import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class UserResponse {
    @ApiProperty({
        description: 'Unique identifier',
        example: '550e8400-e29b-41d4-a716-446655440000'
    })
    public id: string

    @ApiProperty({
        description: 'Name of the user',
        example: 'Artur'
    })
    @IsString()
    public name: string

    @ApiProperty({
        description: 'Email address',
        example: 'artur@example.com'
    })
    public email: string

    @ApiProperty({
        description: 'User creation date',
        example: '2024-03-30T12:34:56.789Z'
    })
    public createdAt: Date
}