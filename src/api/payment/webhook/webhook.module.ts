import { Module } from "@nestjs/common";

import { WebhookController } from "./webhook.controller";
import { WebhookService } from "./webhook.service";
import { WebhookValidator } from "./webhook.validator";

@Module({
     controllers: [WebhookController],
     providers: [WebhookService, WebhookValidator],
})
export class WebhookModule {}