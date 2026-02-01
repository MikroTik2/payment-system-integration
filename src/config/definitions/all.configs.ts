import type { AppConfig } from './app.config'
import type { RedisConfig } from './redis.config'
import type { JwtConfig } from './jwt.config'
import type { MonobankConfig } from './monobank.config'
import type { MailerConfig } from './mailer.config'
import type { QueueConfig } from './queue.config'

export interface AllConfigs {
	app: AppConfig
	redis: RedisConfig
	jwt: JwtConfig
	monobank: MonobankConfig
	mailer: MailerConfig
	queue: QueueConfig
}