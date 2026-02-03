import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { UserResponse } from '@/api/users/dto'
import { Authorized, Protected } from '@/shared/decorators'

import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    public constructor(private readonly usersService: UsersService) {}

    @ApiOperation({
        summary: 'Get current user',
        description: 'Returns data of the authorized user based on the access token.'
    })
    @ApiBearerAuth()
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Current user information',
        type: UserResponse
    })
    @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'User is not authorized or the token is invalid'
    })
    @HttpCode(HttpStatus.OK)
    @Protected()
    @Get('@me')
    public async getMe(@Authorized() user: User) {
        return this.usersService.getById(user.id)
    }
}
