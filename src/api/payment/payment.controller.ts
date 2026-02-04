import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { InitPaymentRequest, InitPaymentResponse } from "./dto";
import type { User } from "@prisma/client";
import { Authorized, Protected } from "@/shared/decorators";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

@Controller('payment')
export class PaymentController {
     public constructor(
          private readonly paymentService: PaymentService
     ) {}

     @ApiOperation({
		summary: 'Init Payment',
		description: 'Creates a new payment and returns a URL to complete the payment process.'
	})
     @Protected()
     @ApiOkResponse({
          type: InitPaymentResponse
     })
     @Post('init')
     @HttpCode(HttpStatus.OK)
     public async init(@Body() dto: InitPaymentRequest, @Authorized() user: User) {
          return this.paymentService.init(dto, user)
     }
}