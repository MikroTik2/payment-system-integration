import { Module } from '@nestjs/common'

import { PlanModule } from './plan/plan.module'
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [PlanModule, UsersModule, AuthModule]
})
export class ApiModule {}