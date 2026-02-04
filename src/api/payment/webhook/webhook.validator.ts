import { Injectable, Logger, UnauthorizedException } from '@nestjs/common'

import CidrMatcher from 'cidr-matcher'
import { IS_DEV_ENV } from '@/shared/utils'

@Injectable()
export class WebhookValidator {
     private readonly logger = new Logger(WebhookValidator.name)

     private readonly TRUSTED_MONOBANK_IPS = new CidrMatcher([
          '35.158.201.27/32',
          '52.58.160.42/32',
          '35.158.31.50/32',
          '35.158.251.173/32',
     ])


     public validateMonobank(ip: string) {
		if (IS_DEV_ENV) {
			this.logger.debug(`Skipping Monobank IP validation in dev mode`)
			return
		}

          if (!this.TRUSTED_MONOBANK_IPS.contains(ip)) {
			this.logger.error(`❌ Invalid Monobank IP: ${ip}`)
			throw new UnauthorizedException(`Invalid Monobank IP: ${ip}`)
          }

          this.logger.log(`✅ Monobank IP validated: ${ip}`)
     }
}