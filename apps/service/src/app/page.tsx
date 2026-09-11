import WhisperForm from './_component/WhisperForm'
import WhisperList from './_component/WhisperList'

type Props = {
  searchParams: { before?: string }
}

export default function Home({ searchParams }: Props): JSX.Element {
  return (
    // 랜딩페이지와 동일하게 밝은 배경 위에 어두운 콘텐츠 영역을 올린다
    <div className="flex min-h-screen justify-center bg-gray-100">
      <main className="flex w-full max-w-[767px] flex-col gap-6 bg-slate-950 p-4 sm:p-8">
        <header>
          <h1 className="font-laundry-bold text-2xl text-white">
            날씨의 속삭임 🌤️
          </h1>
          <p className="pt-1 text-sm text-gray-400">
            오늘의 날씨와 함께, 익명으로 마음을 나눠보세요.
          </p>
        </header>

        <WhisperForm />
        <WhisperList before={searchParams.before} />
      </main>
    </div>
  )
}
