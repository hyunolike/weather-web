'use server'

import { revalidatePath } from 'next/cache'
import { Prisma, ReactionType } from '@prisma/client'
import prisma from '@/commons/prisma'
import { ensureAnonymousId } from '@/commons/anonymousUser'

const isReactionType = (value: string): value is ReactionType =>
  Object.values(ReactionType).includes(value as ReactionType)

/** 같은 반응을 다시 누르면 취소된다 */
const toggleReaction = async (formData: FormData): Promise<void> => {
  const whisperId = String(formData.get('whisperId') ?? '')
  const type = String(formData.get('type') ?? '')

  if (!whisperId || !isReactionType(type)) return

  const userId = ensureAnonymousId()

  try {
    const existing = await prisma.reaction.findUnique({
      where: { whisperId_userId_type: { whisperId, userId, type } },
      select: { id: true },
    })

    if (existing) {
      await prisma.reaction.delete({ where: { id: existing.id } })
    } else {
      await prisma.reaction.create({ data: { whisperId, userId, type } })
    }
  } catch (err) {
    // 이미 삭제된 글에 반응하는 경우 등은 조용히 무시한다
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      ['P2003', 'P2025'].includes(err.code)
    ) {
      return
    }
    throw err
  }

  revalidatePath('/')
}

export default toggleReaction
