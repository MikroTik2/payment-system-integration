import { ApiProperty } from "@nestjs/swagger";
import { BillingPeriod } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class InitPaymentRequest {
	@ApiProperty({
		example: 'pro-plan',
		description: 'Unique identifier of the subscription plan'
	})
	@IsString()
	@IsNotEmpty()
	public planId: string

	@ApiProperty({
		example: BillingPeriod.MONTHLY,
		description: 'Billing period of the subscription',
		enum: BillingPeriod
	})
	@IsEnum(BillingPeriod)
	public billingPeriod: BillingPeriod
}

export class InitPaymentResponse {
     @ApiProperty({
		description: 'This is subscription id',
		example: 's2_AbrCdXyZ13'
	})
	public subscriptionId: string

	@ApiProperty({
		description: 'URL to complete the payment',
		example: 'https://pay.mbnk.biz/s2_AbrCdXyZ13'
	})
	public pageUrl: string
}