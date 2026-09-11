import Link from 'next/link'
import getWhispers from '@/app/_lib/getWhispers'
import WhisperCard from '../WhisperCard'

export default async function WhisperList({ before }: { before?: string }) {
  const { whispers, nextCursor } = await getWhispers(before)

  if (whispers.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-10">
        <p className="text-sm text-gray-500">
          {before
            ? '더 이상 속삭임이 없어요.'
            : '아직 아무도 속삭이지 않았어요. 첫 번째로 남겨보세요.'}
        </p>
        {before && (
          <Link href="/" className="text-xs text-slate-600 underline">
            최신 속삭임으로
          </Link>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {whispers.map((whisper) => (
        <WhisperCard key={whisper.id} whisper={whisper} />
      ))}

      <nav className="flex items-center justify-center gap-4 py-2 text-xs">
        {before && (
          <Link href="/" className="text-slate-600 underline">
            최신 속삭임으로
          </Link>
        )}
        {nextCursor && (
          <Link
            href={`/?before=${nextCursor}`}
            className="rounded-lg border border-gray-200 px-3 py-2 text-slate-600 hover:border-gray-400"
          >
            지난 속삭임 보기
          </Link>
        )}
      </nav>
    </div>
  )
}
