import { Controller, Headers, HttpCode, HttpStatus, Ip, Post, Req } from "@nestjs/common";
import { WebhookService } from "./webhook.service";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('webhook')
export class WebhookController {
     public constructor(private readonly webhookService: WebhookService) {}

	@ApiOperation({
		summary: 'Monobank Webhook',
		description: 'Endpoint to receive Monobank webhook events'
	})
	@ApiOkResponse({
		description: 'Webhook processed successfully',
		schema: {
			example: { ok: true }
		}
	})
	@Post('monobank')
	@HttpCode(HttpStatus.OK)
	public async handleMonobankWebhook(@Req() req: any, @Headers('x-sign') xSign: string, @Ip() ip: string) {
		const rawBody = req.rawBody?.toString('utf8')

		await this.webhookService.handleMonobank({
			rawBody,
			signature: xSign,
			payload: JSON.parse(rawBody),
               ip
		})

		return { ok: true }
	}
}