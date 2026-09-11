import 'server-only'
import { ReactionType } from '@prisma/client'
import prisma from '@/commons/prisma'
import { getAnonymousId } from '@/commons/anonymousUser'
import { ReactionSummary, WhisperView } from '@/types/whisper'

const PAGE_SIZE = 30

/** 최근 속삭임 목록을 반응 집계와 함께 가져온다 */
const getWhispers = async (): Promise<WhisperView[]> => {
  const viewerId = getAnonymousId()

  const whispers = await prisma.whisper.findMany({
    orderBy: { createdAt: 'desc' },
    take: PAGE_SIZE,
    include: {
      reactions: { select: { type: true, userId: true } },
    },
  })

  return whispers.map((whisper) => {
    const reactions: ReactionSummary[] = Object.values(ReactionType).map(
      (type) => {
        const matched = whisper.reactions.filter(
          (reaction) => reaction.type === type,
        )
        return {
          type,
          count: matched.length,
          reactedByMe:
            viewerId !== null &&
            matched.some((reaction) => reaction.userId === viewerId),
        }
      },
    )

    return {
      id: whisper.id,
      content: whisper.content,
      locationName: whisper.locationName,
      weatherCode: whisper.weatherCode,
      temperature: whisper.temperature,
      createdAt: whisper.createdAt,
      isMine: viewerId !== null && whisper.authorId === viewerId,
      reactions,
    }
  })
}

export default getWhispers
