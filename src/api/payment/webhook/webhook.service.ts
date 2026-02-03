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
          this.logger.log(`Received Monobank webhook: ${payload.reference}`)

          this.validator.validateMonobank(ip)

		const isValid = await this.monobankService.webhook.verifyWebhookSignature(Buffer.from(rawBody), signature)
		if (!isValid) {
			this.logger.warn(`Invalid Monobank webhook signature for reference: ${payload.reference}`)
			throw new BadRequestException('Invalid signature')
		}

		if (payload.status === 'created') {
			this.logger.warn(`Payment created: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.CREATED)
		} else if (payload.status === 'processing') {
			this.logger.warn(`Payment processing: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.PROCESSING)
		} else if (payload.status === 'hold') {
			this.logger.warn(`Payment hold: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.HOLD)
		} else if (payload.status === 'success') {
			this.logger.log(`Payment succeeded: ${payload.invoiceId}`)
			return await this.updateStatus(payload.reference, TransactionStatus.HOLD)
		} else if (payload.status === 'failure') {
			this.logger.warn(`Payment failure: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.FAILURE)
		} else if (payload.status === 'reversed') {
			this.logger.warn(`Payment reversed: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.REVERSED)
		} else if (payload.status === 'expired') {
			this.logger.warn(`Payment expired: ${payload.reference}`)
			return await this.updateStatus(payload.reference, TransactionStatus.EXPIRED)
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