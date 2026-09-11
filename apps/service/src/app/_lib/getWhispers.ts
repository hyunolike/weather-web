import 'server-only'
import { Prisma, ReactionType } from '@prisma/client'
import prisma from '@/commons/prisma'
import { getAnonymousId } from '@/commons/anonymousUser'
import { ReactionSummary, WhisperPage, WhisperView } from '@/types/whisper'
import { PAGE_SIZE } from '@/constants/whisper'

/**
 * 최근 속삭임 목록을 반응 집계와 함께 가져온다.
 * before 가 주어지면 그 글보다 오래된 글부터 가져온다 (커서 페이지네이션).
 */
const getWhispers = async (before?: string): Promise<WhisperPage> => {
  const viewerId = getAnonymousId()

  // 커서로 받은 id 가 유효하지 않으면 첫 페이지를 보여준다
  const cursorWhisper = before
    ? await prisma.whisper.findUnique({
        where: { id: before },
        select: { createdAt: true },
      })
    : null

  const now = new Date()

  // 신고로 임시 숨김된 글은 목록에서 빼되, 작성자 본인에게는 보여준다
  const visibleToViewer: Prisma.WhisperWhereInput = {
    OR: [
      { hiddenUntil: null },
      { hiddenUntil: { lte: now } },
      ...(viewerId ? [{ authorId: viewerId }] : []),
    ],
  }

  const rows = await prisma.whisper.findMany({
    where: {
      AND: [
        visibleToViewer,
        cursorWhisper ? { createdAt: { lt: cursorWhisper.createdAt } } : {},
      ],
    },
    orderBy: { createdAt: 'desc' },
    // 다음 페이지가 있는지 확인하려고 한 건 더 가져온다
    take: PAGE_SIZE + 1,
    include: {
      reactions: { select: { type: true, userId: true } },
      reports: { select: { reporterId: true } },
    },
  })

  const hasNext = rows.length > PAGE_SIZE
  const pageRows = hasNext ? rows.slice(0, PAGE_SIZE) : rows

  const whispers: WhisperView[] = pageRows.map((whisper) => {
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
      reportedByMe:
        viewerId !== null &&
        whisper.reports.some((report) => report.reporterId === viewerId),
      hiddenUntil:
        whisper.hiddenUntil && whisper.hiddenUntil > now
          ? whisper.hiddenUntil
          : null,
    }
  })

  return {
    whispers,
    nextCursor: hasNext ? whispers[whispers.length - 1].id : null,
  }
}

export default getWhispers
