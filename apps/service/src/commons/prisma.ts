import { PrismaClient } from '@prisma/client'

// 개발 모드에서는 HMR 마다 PrismaClient 가 새로 생성되어 커넥션이 누수되므로
// globalThis 에 하나만 만들어 재사용한다.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

export default prisma
