import React from 'react'

import type { User } from '@prisma/client'
import {
	Body,
	Heading,
	Html,
	Link,
	Text
} from '@react-email/components'

interface ResetPasswordTemplateProps {
	user: User
	token: string
}

export function ResetPasswordTemplate({ user, token }: ResetPasswordTemplateProps) {
	const resetLink = `${process.env.HTTP_CORS.split(',')[1]}/auth/recovery/${token}`

	return (
		<Html>
			<Body>
				<Heading>Email Confirmation</Heading>
				<Text>
					Hi! To confirm your email address, please follow the link below:
				</Text>
				<Link href={resetLink}>Confirm email</Link>
				<Text>
					This link is valid for 1 hour. If you did not request this confirmation,
					simply ignore this message.
				</Text>
				<Text>Thank you for using our service!</Text>
			</Body>
		</Html>
	)
}