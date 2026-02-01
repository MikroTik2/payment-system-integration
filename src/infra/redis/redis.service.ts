import { Inject, Injectable, Logger, type OnModuleDestroy, type OnModuleInit } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(RedisService.name)
	public constructor(
		@Inject('REDIS_CLIENT')
		private readonly redis: Redis
	) {}

	public async onModuleInit() {
		this.logger.log('🔄 Initializing Redis connection...')

		try {
			const pong = await this.redis.ping()
			this.logger.log(`✅ Redis connection established. PING response: ${pong}`)
		} catch (error) {
			this.logger.error('❌ Failed to connect to Redis', error)
		}
	}

	public onModuleDestroy() {
		this.logger.warn('⚙️ Disconnecting from Redis...')
		this.redis.quit()
		this.logger.log('🔌 Redis disconnected successfully')
	}

	public async set(key: string, value: string) {
		return await this.redis.set(key, value)
	}

	public async get(key: string) {
		return await this.redis.get(key)
	}

	public async del(key: string) {
		return await this.redis.del(key)
	}

	public async setTokenToBlackList(token: string, exp: number) {
		return await this.redis.set(token, 'true', 'EX', exp)
	}
}