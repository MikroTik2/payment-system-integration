import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { InfraModule } from '@/infra/infra.module'
import { appEnv, monobankEnv, jwtEnv, redisEnv } from '@/config/env'
import { IS_DEV_ENV } from '@/shared/utils'
import { LibsModule } from '@/libs/libs.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			ignoreEnvFile: !IS_DEV_ENV,
			isGlobal: true,
			load: [appEnv, redisEnv, monobankEnv, jwtEnv]
		}),
		
		InfraModule,
		LibsModule
	]
})
export class AppModule {}