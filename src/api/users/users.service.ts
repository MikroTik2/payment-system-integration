import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/infra/prisma/prisma.service'

@Injectable()
export class UsersService {
    public constructor(public readonly prismaService: PrismaService) {}

    public async getById(id: string) {
        return this.prismaService.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true
            }
        })
    }
}