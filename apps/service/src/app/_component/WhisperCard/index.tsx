import { ReactionType } from '@prisma/client'
import { describeWeather } from '@/apis/weather'
import { formatRelativeTime } from '@/utils/date'
import { WhisperView } from '@/types/whisper'
import toggleReaction from '@/app/_lib/toggleReaction'

const REACTION_LABEL: Record<ReactionType, string> = {
  empathy: '💙 공감',
  cheer: '🌤️ 응원',
  hug: '🫂 토닥',
}

export default function WhisperCard({ whisper }: { whisper: WhisperView }) {
  const weather = describeWeather(whisper.weatherCode)

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-4">
      <header className="flex items-center gap-2 text-xs text-gray-500">
        <span aria-hidden>{weather.emoji}</span>
        <span>
          {whisper.locationName} · {weather.label} ·{' '}
          {Math.round(whisper.temperature)}°C
        </span>
        <span className="ml-auto">
          {formatRelativeTime(whisper.createdAt)}
          {whisper.isMine && ' · 내 글'}
        </span>
      </header>

      <p className="whitespace-pre-wrap break-words py-3 text-sm">
        {whisper.content}
      </p>

      <footer className="flex gap-2">
        {whisper.reactions.map((reaction) => (
          // 반응 토글은 폼 제출로 처리해 클라이언트 자바스크립트 없이도 동작한다
          <form action={toggleReaction} key={reaction.type}>
            <input type="hidden" name="whisperId" value={whisper.id} />
            <input type="hidden" name="type" value={reaction.type} />
            <button
              type="submit"
              aria-pressed={reaction.reactedByMe}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                reaction.reactedByMe
                  ? 'border-slate-800 bg-slate-800 text-white'
                  : 'border-gray-200 text-gray-600 hover:border-gray-400'
              }`}
            >
              {REACTION_LABEL[reaction.type]}
              {reaction.count > 0 && ` ${reaction.count}`}
            </button>
          </form>
        ))}
      </footer>
    </article>
  )
}
