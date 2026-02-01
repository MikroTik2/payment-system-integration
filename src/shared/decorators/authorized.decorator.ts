import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { type User } from '@prisma/client'
import { Request } from 'express'

export const Authorized = createParamDecorator((data: keyof User | undefined, ctx: ExecutionContext) => {
	const req = ctx.switchToHttp().getRequest<Request>()
	const user = req.user as User

	if (!user) return null

	return data ? user[data] : user
})