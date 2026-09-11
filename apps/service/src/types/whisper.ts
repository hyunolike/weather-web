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
}
