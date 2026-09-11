import { ReactionType } from '@prisma/client'

export type WhisperFormState = {
  status: 'idle' | 'success' | 'error'
  message: string
}

export const INITIAL_WHISPER_FORM_STATE: WhisperFormState = {
  status: 'idle',
  message: '',
}

export type ReactionSummary = {
  type: ReactionType
  count: number
  reactedByMe: boolean
}

export type WhisperView = {
  id: string
  content: string
  locationName: string
  weatherCode: number
  temperature: number
  createdAt: Date
  isMine: boolean
  reactions: ReactionSummary[]
  /** 내가 이미 신고한 글인지 */
  reportedByMe: boolean
  /** 신고 누적으로 임시 숨김된 글인지 (작성자 본인에게만 보인다) */
  hiddenUntil: Date | null
}

export type WhisperPage = {
  whispers: WhisperView[]
  /** 다음 페이지가 없으면 null */
  nextCursor: string | null
}
