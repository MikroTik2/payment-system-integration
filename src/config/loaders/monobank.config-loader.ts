import { ConfigService } from '@nestjs/config'
import { AllConfigs } from '../definitions'

import type { MonobankModuleOptions } from 'nestjs-monobank'

export function getMonobankConfig(configService: ConfigService<AllConfigs>): MonobankModuleOptions {
     return {
          apiKey: configService.get('monobank.apiKey', { infer: true }),
     }
}