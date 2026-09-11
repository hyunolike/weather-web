import { ReportReason } from '@prisma/client'

// KISO 유해게시물 분류와 국내 커뮤니티 신고 사유를 참고했다.
export const REPORT_REASON_LABEL: Record<ReportReason, string> = {
  abuse: '욕설 · 비방',
  obscene: '음란 · 선정성',
  spam: '광고 · 도배',
  privacy: '개인정보 노출',
  etc: '기타',
}

export const REPORT_REASONS = Object.keys(REPORT_REASON_LABEL) as ReportReason[]
