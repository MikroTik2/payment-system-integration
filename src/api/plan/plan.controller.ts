import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'

import { PlanResponse } from './dto'
import { PlanService } from './plan.service'

@Controller('plans')
export class PlanController {
     constructor(private readonly planService: PlanService) {}

     @ApiOperation({
          summary: 'Get all plans',
          description: 'Returns a list of all pricing plans'
     })
     @ApiResponse({
          status: HttpStatus.OK,
          description: 'The list of pricing plans has been successfully retrieved',
          type: [PlanResponse]
     })
     @Get()
     public async getAll() {
          return this.planService.getAll()
     }

     @ApiOperation({
          summary: 'Get plan by ID',
          description: 'Returns a pricing plan by its unique identifier'
     })
     @ApiResponse({
          status: HttpStatus.OK,
          description: 'The pricing plan has been successfully found',
          type: PlanResponse
     })
     @ApiResponse({
          status: HttpStatus.NOT_FOUND,
          description: 'A pricing plan with the specified ID was not found'
     })
     @Get(':id')
     public async getById(@Param('id') id: string) {
          return this.planService.getById(id)
     }
}
