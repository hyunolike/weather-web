import { ReactionType } from '@prisma/client'
import { describeWeather } from '@/apis/weather'
import { formatRelativeTime } from '@/utils/date'
import { WhisperView } from '@/types/whisper'
import { REPORT_REASONS, REPORT_REASON_LABEL } from '@/constants/report'
import toggleReaction from '@/app/_lib/toggleReaction'
import reportWhisper from '@/app/_lib/reportWhisper'

const REACTION_LABEL: Record<ReactionType, string> = {
  empathy: '💙 공감',
  cheer: '🌤️ 응원',
  hug: '🫂 토닥',
}

const formatDate = (date: Date) =>
  `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`

export default function WhisperCard({ whisper }: { whisper: WhisperView }) {
  const weather = describeWeather(whisper.weatherCode)
  const isHidden = whisper.hiddenUntil !== null

  return (
    <article
      className={`rounded-lg border p-4 ${
        isHidden ? 'border-amber-200 bg-amber-50' : 'border-gray-200 bg-white'
      }`}
    >
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

      {isHidden && (
        <p className="mt-2 rounded bg-amber-100 p-2 text-xs text-amber-800">
          신고가 누적되어 {formatDate(whisper.hiddenUntil!)}까지 다른 사람에게
          보이지 않습니다. 기간이 지나면 다시 공개됩니다.
        </p>
      )}

      <p className="whitespace-pre-wrap break-words py-3 text-sm">
        {whisper.content}
      </p>

      <footer className="flex flex-wrap items-center gap-2">
        {whisper.reactions.map((reaction) => (
          // 반응 토글은 폼 제출로 처리해 클라이언트 자바스크립트 없이도 동작한다
          <form action={toggleReaction} key={reaction.type}>
            <input type="hidden" name="whisperId" value={whisper.id} />
            <input type="hidden" name="type" value={reaction.type} />
            <button
              type="submit"
              aria-pressed={reaction.reactedByMe}
              disabled={isHidden}
              className={`rounded-full border px-3 py-1 text-xs transition-colors disabled:opacity-40 ${
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

        {!whisper.isMine && !isHidden && (
          <div className="ml-auto text-xs text-gray-400">
            {whisper.reportedByMe ? (
              <span>신고함</span>
            ) : (
              // details 를 쓰면 자바스크립트 없이도 사유 선택을 펼칠 수 있다
              <details className="relative">
                <summary className="cursor-pointer list-none hover:text-gray-600">
                  신고
                </summary>
                <form
                  action={reportWhisper}
                  className="mt-2 flex items-center gap-1"
                >
                  <input type="hidden" name="whisperId" value={whisper.id} />
                  <label className="sr-only" htmlFor={`reason-${whisper.id}`}>
                    신고 사유
                  </label>
                  <select
                    id={`reason-${whisper.id}`}
                    name="reason"
                    className="rounded border border-gray-200 px-1 py-0.5 text-xs text-gray-600"
                  >
                    {REPORT_REASONS.map((reason) => (
                      <option key={reason} value={reason}>
                        {REPORT_REASON_LABEL[reason]}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded border border-gray-200 px-2 py-0.5 text-xs text-gray-600 hover:border-gray-400"
                  >
                    신고하기
                  </button>
                </form>
              </details>
            )}
          </div>
        )}
      </footer>
    </article>
  )
}
