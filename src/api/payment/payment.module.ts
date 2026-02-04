import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MonobankModule } from 'nestjs-monobank'

import { getMonobankConfig } from '@/config'

import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

import { WebhookModule } from './webhook/webhook.module'

@Module({
	imports: [
		MonobankModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getMonobankConfig,
			inject: [ConfigService]
		}),

		WebhookModule
	],
	controllers: [PaymentController],
	providers: [PaymentService]
})
export class PaymentModule {}