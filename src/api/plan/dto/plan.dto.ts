import { ApiProperty } from '@nestjs/swagger'

export class PlanResponse {
	@ApiProperty({
		example: 'clm7x5h1d0000abc123xyz789',
		description: 'Unique identifier of the plan'
	})
	public id: string

	@ApiProperty({
		example: 'Pro',
		description: 'Name of the subscription plan'
	})
	public title: string

	@ApiProperty({
		example: 'Advanced plan for professional use',
		description: 'Brief description of the subscription plan'
	})
	public description: string

	@ApiProperty({
		example: ['Unlimited projects', '24/7 support', 'Access to premium features'],
		description: 'List of features included in the plan',
		type: [String]
	})
	public features: string[]

	@ApiProperty({
		example: 19.99,
		description: 'Monthly price of the plan (in USD or relevant currency)'
	})
	public monthlyPrice: number

	@ApiProperty({
		example: 199.99,
		description: 'Yearly price of the plan (in USD or relevant currency)'
	})
	public yearlyPrice: number

	@ApiProperty({
		example: true,
		description: 'Indicates whether this plan is featured or highlighted'
	})
	public isFeatured: boolean
}