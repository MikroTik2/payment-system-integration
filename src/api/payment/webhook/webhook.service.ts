import { PrismaService } from "@/infra/prisma/prisma.service";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { MonobankService } from "nestjs-monobank";
import { WebhookValidator } from "./webhook.validator";
import { TransactionStatus } from "@prisma/client";

@Injectable()
export class WebhookService {
     private readonly logger = new Logger(WebhookService.name)

     public constructor(
          private readonly monobankService: MonobankService,
          private readonly prismaService: PrismaService,
          private readonly validator: WebhookValidator
     ) {}

     public async handleMonobank({ rawBody, signature, payload, ip }: { rawBody: string; signature: string; payload: any, ip: string }) {
		console.log(payload)
		console.log(ip)
          this.logger.log(`Received Monobank webhook: ${payload.reference}`)

          this.validator.validateMonobank(ip)

		const isValid = await this.monobankService.webhook.verifyWebhookSignature(Buffer.from(rawBody), signature)
		if (!isValid) {
			this.logger.warn(`Invalid Monobank webhook signature for reference: ${payload.reference}`)
			throw new BadRequestException('Invalid signature')
		}

		if (payload.status === 'created') {
			this.logger.warn(`Payment created: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.CREATED)
		} else if (payload.status === 'processing') {
			this.logger.warn(`Payment processing: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.PROCESSING)
		} else if (payload.status === 'hold') {
			this.logger.warn(`Payment hold: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.HOLD)
		} else if (payload.status === 'success') {
			this.logger.log(`Payment succeeded: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.HOLD)
		} else if (payload.status === 'failure') {
			this.logger.warn(`Payment failure: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.FAILURE)
		} else if (payload.status === 'reversed') {
			this.logger.warn(`Payment reversed: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.REVERSED)
		} else if (payload.status === 'expired') {
			this.logger.warn(`Payment expired: ${payload.subscriptionId}`)
			return await this.updateStatus(payload.subscriptionId, TransactionStatus.EXPIRED)
		}
     }

     private async updateStatus(subscriptionId: string, status: TransactionStatus) {
		await this.prismaService.transaction.update({
			where: { externalId: subscriptionId },
			data: {
				status
			}
		})
	}
}