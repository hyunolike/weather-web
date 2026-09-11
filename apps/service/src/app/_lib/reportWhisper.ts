'use server'

import { revalidatePath } from 'next/cache'
import { Prisma, ReportReason } from '@prisma/client'
import prisma from '@/commons/prisma'
import { ensureAnonymousId } from '@/commons/anonymousUser'
import {
  REPORT_HIDE_DURATION_MS,
  REPORT_HIDE_THRESHOLD,
} from '@/constants/whisper'

const isReportReason = (value: string): value is ReportReason =>
  Object.values(ReportReason).includes(value as ReportReason)

/**
 * 속삭임을 신고한다.
 *
 * 서로 다른 사용자의 신고가 임계치를 넘으면 임시 숨김 처리한다.
 * 숨김은 영구 삭제가 아니라 기간이 정해진 임시조치이며, 기간이 지나면
 * 다시 공개된다. 영구 삭제 여부는 운영자가 따로 판단한다.
 */
const reportWhisper = async (formData: FormData): Promise<void> => {
  const whisperId = String(formData.get('whisperId') ?? '')
  const reason = String(formData.get('reason') ?? '')

  if (!whisperId || !isReportReason(reason)) return

  const reporterId = ensureAnonymousId()

  const whisper = await prisma.whisper.findUnique({
    where: { id: whisperId },
    select: { authorId: true, hiddenUntil: true },
  })
  if (!whisper) return

  // 자기 글은 신고할 수 없다
  if (whisper.authorId === reporterId) return

  // 이미 임시 숨김 중이면 더 처리할 것이 없다
  if (whisper.hiddenUntil && whisper.hiddenUntil > new Date()) return

  try {
    await prisma.report.create({
      data: { whisperId, reporterId, reason },
    })
  } catch (err) {
    // 이미 신고한 글이거나 그 사이 삭제된 글이면 조용히 넘어간다
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      ['P2002', 'P2003'].includes(err.code)
    ) {
      return
    }
    throw err
  }

  const reportCount = await prisma.report.count({ where: { whisperId } })
  if (reportCount >= REPORT_HIDE_THRESHOLD) {
    const now = new Date()
    await prisma.whisper.update({
      where: { id: whisperId },
      data: {
        hiddenAt: now,
        hiddenUntil: new Date(now.getTime() + REPORT_HIDE_DURATION_MS),
      },
    })
  }

  revalidatePath('/')
}

export default reportWhisper
