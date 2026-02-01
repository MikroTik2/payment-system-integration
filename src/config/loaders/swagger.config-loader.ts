import { DocumentBuilder } from '@nestjs/swagger'

export function getSwaggerConfig() {
	return new DocumentBuilder()
		.setTitle('PAYMENT SYSTEM INTEGRATION API')
		.setDescription('API for PAYMENT SYSTEM INTEGRATION product platform')
		.setVersion('1.0.0')
		.setContact('PAYMENT SYSTEM INTEGRATION Support', 'https://lms.com', 'support@lms.com')
		.setLicense('AGPLv3', 'https://github.com/MikroTik2/payment-system-integration')
		.build()
}