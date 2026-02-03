import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { ExtractJwt, Strategy, StrategyOptionsWithRequest } from 'passport-jwt'

import { JwtPayload } from '@/api/auth/interfaces'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { RedisService } from '@/infra/redis/redis.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	public constructor(
		private readonly configService: ConfigService,
		private readonly redisService: RedisService,
		private readonly prismaService: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.getOrThrow<string>('JWT_SECRET'),
			algorithms: ['HS256'],
			passReqToCallback: true
		} as StrategyOptionsWithRequest)
	}
	public async validate(req: Request, payload: JwtPayload) {
		const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
		const isTokenInBlacklist = await this.redisService.get(token)

		if (isTokenInBlacklist) {
			throw new UnauthorizedException('This token is already in the blacklist')
		}

		const user = await this.prismaService.user.findUnique({
			where: {
				id: payload.id
			}
		})
		if (!user) {
			throw new UnauthorizedException('Please login to continue')
		}
		return {
			id: user.id
		}
	}
}