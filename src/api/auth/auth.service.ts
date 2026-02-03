import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { type User } from '@prisma/client'
import { hash, verify } from 'argon2'
import { randomBytes } from 'node:crypto'
import { PrismaService } from 'src/infra/prisma/prisma.service'
import { RedisService } from 'src/infra/redis/redis.service'

import { MailService } from '@/libs/mail/mail.service'
import { StringValue } from '@/shared/utils'

import { LoginRequest, PasswordResetRequest, RegisterRequest, SendPasswordResetRequest } from './dto'
import { JwtPayload } from './interfaces'

@Injectable()
export class AuthService {
	private readonly JWT_ACCESS_TOKEN_TTL: StringValue
	private readonly JWT_REFRESH_TOKEN_TTL: StringValue

	public constructor(
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
		private readonly redisService: RedisService,
		private readonly mailService: MailService
	) {
		this.JWT_ACCESS_TOKEN_TTL = this.configService.getOrThrow<StringValue>('JWT_ACCESS_TOKEN_TTL')
		this.JWT_REFRESH_TOKEN_TTL = this.configService.getOrThrow<StringValue>('JWT_REFRESH_TOKEN_TTL')
	}

	public async register(dto: RegisterRequest) {
		const { name, email, password } = dto

		const exists = await this.prismaService.user.findUnique({
			where: { email }
		})

		if (exists) {
			throw new BadRequestException('User with this email already exists')
		}

		const user = await this.prismaService.user.create({
			data: {
				name,
				email,
				password: await hash(password)
			}
		})

		const tokens = await this.generateToken(user)

		return {
			accessToken: tokens.accessToken,
			refreshToken: tokens.refreshToken
		}
	}

	public async login(dto: LoginRequest) {
		const { email, password } = dto

		const user = await this.prismaService.user.findFirst({
			where: {
				email
			}
		})
		if (!user) throw new NotFoundException('Invalid email or password')

		const isValidPassword = await verify(user.password, password)
		if (!isValidPassword) throw new NotFoundException('Invalid email or password')

		const token = await this.generateToken(user)

		return {
			accessToken: token.accessToken,
			refreshToken: token.refreshToken
		}
	}

	public async logout(refreshToken: string, accessToken: string) {
		await this.redisService.setTokenToBlackList(accessToken, this.configService.getOrThrow<StringValue>('JWT_ACCESS_TOKEN_TTL'))
		await this.redisService.setTokenToBlackList(refreshToken, this.configService.getOrThrow<StringValue>('JWT_REFRESH_TOKEN_TTL'))
	}

	public async sendPasswordReset(dto: SendPasswordResetRequest) {
		const { email } = dto

		const user = await this.prismaService.user.findUnique({
			where: {
				email
			}
		})

		if (!user) throw new NotFoundException('User not found')

		const token = randomBytes(64).toString('hex')

		const expiry = new Date()
		expiry.setHours(expiry.getHours() + 1)

		await this.prismaService.passwordReset.upsert({
			where: {
				userId: user.id
			},
			update: {
				token,
				expiry
			},
			create: {
				token,
				expiry,
				userId: user.id
			}
		})

		await this.mailService.sendPasswordReset(user, token)

		return true
	}

	public async passwordReset(dto: PasswordResetRequest) {
		const { token, password } = dto

		const reset = await this.prismaService.passwordReset.findUnique({
			where: {
				token
			}
		})

		if (!reset) {
			throw new NotFoundException('Token not found')
		}

		if (new Date() > reset.expiry) {
			throw new BadRequestException('Expiry token expired')
		}

		await this.prismaService.user.update({
			where: {
				id: reset.userId
			},
			data: {
				password: await hash(password)
			}
		})

		await this.prismaService.passwordReset.delete({
			where: {
				id: reset.id
			}
		})

		return true
	}

	public async refresh(user: User, refreshToken: string) {
		if (!refreshToken) throw new BadRequestException('Refresh token is required')

		const payload: JwtPayload = {
			id: user.id
		}
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL
		})
		return { accessToken }
	}

	private async generateToken(user: User) {
		const payload: JwtPayload = {
			id: user.id
		}
		const accessToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_ACCESS_TOKEN_TTL
		})

		const refreshToken = await this.jwtService.signAsync(payload, {
			expiresIn: this.JWT_REFRESH_TOKEN_TTL
		})
		return {
			accessToken,
			refreshToken
		}
	}
}