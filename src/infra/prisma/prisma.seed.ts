import { PrismaClient } from '@prisma/client'

import { plans } from './data'

const prisma = new PrismaClient()

async function main() {
	try {
		console.log('🔄 Seeding database')

		await prisma.plan.deleteMany()
		await prisma.plan.createMany({
			data: plans
		})

		console.log('✅ Seeding finished')
	} catch (error) {
		console.log(error)
		throw new Error('❌ Failed to seed the database')
	}
}

void main()