import { registerAs } from '@nestjs/config';

import type { MonobankConfig } from '../definitions';
import { validateEnv } from '../utils/validate-env';
import { MonobankValidator } from '../validators'

export const monobankEnv = registerAs<MonobankConfig>('monobank', () => {
     validateEnv(process.env, MonobankValidator)

     return {
          apiKey: process.env.MONOBANK_PUBLIC_KEY_TEST,
     }
})