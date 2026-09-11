import getWhispers from '@/app/_lib/getWhispers'
import WhisperCard from '../WhisperCard'

export default async function WhisperList() {
  const whispers = await getWhispers()

  if (whispers.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-gray-500">
        아직 아무도 속삭이지 않았어요. 첫 번째로 남겨보세요.
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {whispers.map((whisper) => (
        <WhisperCard key={whisper.id} whisper={whisper} />
      ))}
    </div>
  )
}
