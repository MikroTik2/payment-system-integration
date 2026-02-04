import { Module } from '@nestjs/common'

import { PlanModule } from './plan/plan.module'
import { UsersModule } from "./users/users.module";
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';

@Module({
	imports: [PlanModule, UsersModule, PaymentModule, AuthModule]
})
export class ApiModule {}