import { Body, Controller, HttpCode, HttpStatus, Patch, Post } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger'
import type { User } from '@prisma/client'

import { AuthService } from './auth.service'
import { AuthResponse, LoginRequest, PasswordResetRequest, RegisterRequest, SendPasswordResetRequest, TokensResponse } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@ApiOperation({ summary: 'User registration' })
	@ApiResponse({
		status: HttpStatus.CREATED,
		description: 'User successfully registered',
		type: AuthResponse
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'User with this email already exists'
	})
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	public async register(@Body() dto: RegisterRequest) {
		return this.authService.register(dto)
	}

	@ApiOperation({ summary: 'User login' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Successful authentication',
		type: AuthResponse
	})
	@ApiResponse({
		status: HttpStatus.NOT_FOUND,
		description: 'Invalid email or password'
	})
	@ApiResponse({
		status: HttpStatus.BAD_REQUEST,
		description: 'Invalid input data'
	})
	@HttpCode(HttpStatus.OK)
	@Post('login')
	public async login(@Body() dto: LoginRequest) {
		return this.authService.login(dto)
	}

	@ApiOperation({ summary: 'User logout' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'User successfully logged out'
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'User is not authorized'
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error'
	})
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	public async logout(@Body() tokens: TokensResponse) {
		await this.authService.logout(tokens.refreshToken, tokens.accessToken)
	}

	@ApiOperation({
		summary: 'Send Password Reset',
		description: 'Send an email to reset account password.'
	})
	@ApiOkResponse({
		type: Boolean
	})
	@Post('reset-password')
	@HttpCode(HttpStatus.OK)
	public async sendPasswordReset(@Body() dto: SendPasswordResetRequest) {
		return this.authService.sendPasswordReset(dto)
	}

	@ApiOperation({
		summary: 'Password Reset',
		description: 'Confirm password reset and change the password.'
	})
	@ApiOkResponse({
		type: Boolean
	})
	@Patch('reset-password')
	@HttpCode(HttpStatus.OK)
	public async passwordReset(@Body() dto: PasswordResetRequest) {
		return this.authService.passwordReset(dto)
	}

	@ApiOperation({ summary: 'Refresh access token using a refresh token' })
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Access token successfully refreshed'
	})
	@ApiResponse({
		status: HttpStatus.UNAUTHORIZED,
		description: 'User is not authorized'
	})
	@ApiResponse({
		status: HttpStatus.INTERNAL_SERVER_ERROR,
		description: 'Internal server error'
	})
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	public async refresh(user: User, @Body('refreshToken') refreshToken: string) {
		return this.authService.refresh(user, refreshToken)
	}
}