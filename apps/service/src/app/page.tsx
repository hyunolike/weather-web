import WhisperForm from './_component/WhisperForm'
import WhisperList from './_component/WhisperList'

type Props = {
  searchParams: { before?: string }
}

export default function Home({ searchParams }: Props): JSX.Element {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 p-4 sm:p-8">
      <header>
        <h1 className="text-2xl font-bold">날씨의 속삭임 🌤️</h1>
        <p className="text-sm text-gray-500">
          오늘의 날씨와 함께, 익명으로 마음을 나눠보세요.
        </p>
      </header>

      <WhisperForm />
      <WhisperList before={searchParams.before} />
    </main>
  )
}
