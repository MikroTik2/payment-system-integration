import { registerAs } from '@nestjs/config';

import type { JwtConfig } from '../definitions';
import { validateEnv } from '../utils/validate-env';
import { JwtValidator } from '../validators'

export const jwtEnv = registerAs<JwtConfig>('jwt', () => {
	validateEnv(process.env, JwtValidator)

	return {
		secret: process.env.JWT_SECRET,
	}
})