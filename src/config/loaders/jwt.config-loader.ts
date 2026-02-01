import { ConfigService } from '@nestjs/config'

import { AllConfigs } from '../definitions'
import { JwtModuleOptions } from '@nestjs/jwt'

export function getJwtConfig(configService: ConfigService<AllConfigs>): JwtModuleOptions {
     return {
          secret: configService.get('jwt.secret', { infer: true }),
     }
}