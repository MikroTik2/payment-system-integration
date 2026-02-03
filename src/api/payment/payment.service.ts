import { PrismaService } from "@/infra/prisma/prisma.service";
import {  Injectable, NotFoundException } from "@nestjs/common";
import { MonobankService } from "nestjs-monobank";
import { InitPaymentRequest } from "./dto";
import { BillingPeriod, type User } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class PaymentService {
     public constructor(
          private readonly monobankService: MonobankService,
		private readonly configService: ConfigService,
          private readonly prismaService: PrismaService
     ) {}

     public async create(dto: InitPaymentRequest, user: User) {
		const { planId, billingPeriod } = dto

		const plan = await this.prismaService.plan.findUnique({
			where: {
				id: planId
			}
		})

		if (!plan) throw new NotFoundException('Plan not found')

		const amount = billingPeriod === BillingPeriod.MONTHLY ? plan.monthlyPrice : plan.yearlyPrice
		const interval = billingPeriod === BillingPeriod.MONTHLY ? '1m' : '1y'

          const transaction = await this.prismaService.transaction.create({
			data: {
				amount,
				billingPeriod,
				user: {
					connect: {
						id: user.id
					}
				},
				subscription: {
					connectOrCreate: {
						where: {
							userId: user.id
						},
						create: {
							user: {
								connect: {
									id: user.id
								}
							},
							plan: {
								connect: {
									id: planId
								}
							}
						}
					}
				}
			}
		})

          const payment = await this.monobankService.subscriptions.create({
               amount,
			interval,
			redirectUrl: `${this.configService.getOrThrow<string>('HTTP_CORS').split(',')[0]}/thanks`
		})

          await this.prismaService.transaction.update({
			where: {
				id: transaction.id
			},
			data: {
				externalId: payment.subscriptionId
			}
		})

		return payment
     }
}