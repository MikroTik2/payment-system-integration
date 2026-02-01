import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { getRedisConfig } from '@/config'

import { RedisService } from './redis.service'

@Module({
	providers: [
		{
			useFactory: getRedisConfig,
			inject: [ConfigService],
			provide: 'REDIS_CLIENT'
		},
		RedisService
	],
	exports: [RedisService]
})
export class RedisModule {}