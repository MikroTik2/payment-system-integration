import type { Plan } from '@prisma/client'

export const plans: Omit<Plan, 'id' | 'createdAt' | 'updatedAt'>[] = [
	{
		title: 'Basic',
		description: 'Perfect for small projects and individual entrepreneurs.',
		features: [
			'5 projects',
			'10GB storage',
			'Basic support',
			'Access to core features'
		],
		isFeatured: false,
		monthlyPrice: 858,
		yearlyPrice: 8168,
	},
	{
		title: 'Professional',
		description: 'For growing businesses with advanced needs.',
		features: [
			'20 projects',
			'50GB storage',
			'Priority support',
			'Advanced analytics features',
			'Third-party service integrations'
		],
		isFeatured: true,
		monthlyPrice: 1890,
		yearlyPrice: 17820,
	},
	{
		title: 'Enterprise',
		description: 'A complete package for large companies and enterprises.',
		features: [
			'Unlimited projects',
			'500GB storage',
			'24/7 support',
			'Dedicated account manager',
			'Advanced security tools',
			'Custom integrations'
		],
		isFeatured: false,
		monthlyPrice: 4290,
		yearlyPrice: 39990,
	}
]
