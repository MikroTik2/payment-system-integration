import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { appEnv, monobankEnv, jwtEnv, redisEnv } from '@/config/env'
import { IS_DEV_ENV } from '@/shared/utils'

import { InfraModule } from '@/infra/infra.module'
import { LibsModule } from '@/libs/libs.module'
import { ApiModule } from '@/api/api.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
			load: [appEnv, redisEnv, monobankEnv, jwtEnv]
		}),
		
		ApiModule,
		InfraModule,
		LibsModule
	]
})
export class AppModule {}