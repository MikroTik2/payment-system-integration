import { MailerService } from '@nestjs-modules/mailer'
import { InjectQueue } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import type { User } from '@prisma/client'
import { render } from '@react-email/components'
import { Queue } from 'bullmq'

import { ResetPasswordTemplate } from './templates/reset-password.template'

@Injectable()
export class MailService {
	public constructor(
		private readonly mailerService: MailerService,
		@InjectQueue('mail') private readonly queue: Queue
	) {}

	public async sendPasswordReset(user: User, token: string) {
		const html = await render(ResetPasswordTemplate({ user, token }))

		await this.queue.add('send-email', { email: user.email, subject: 'Password reset', html }, { removeOnComplete: true })

		return true
	}

	public sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}