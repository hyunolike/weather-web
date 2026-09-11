'use client'

import { useEffect, useRef } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import createWhisper from '@/app/_lib/createWhisper'
import { DEFAULT_LOCATION_CODE, LOCATIONS } from '@/constants/locations'
import { INITIAL_WHISPER_FORM_STATE } from '@/types/whisper'
import { MAX_CONTENT_LENGTH } from '@/constants/whisper'

// useFormStatus 는 form 의 자식 컴포넌트에서만 제출 상태를 읽을 수 있다
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-50"
    >
      {pending ? '남기는 중...' : '속삭이기'}
    </button>
  )
}

export default function WhisperForm() {
  const [state, formAction] = useFormState(
    createWhisper,
    INITIAL_WHISPER_FORM_STATE,
  )
  const formRef = useRef<HTMLFormElement>(null)

  // 작성에 성공하면 입력값을 비운다
  useEffect(() => {
    if (state.status === 'success') {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4"
    >
      <label className="sr-only" htmlFor="locationCode">
        지역
      </label>
      <select
        id="locationCode"
        name="locationCode"
        defaultValue={DEFAULT_LOCATION_CODE}
        className="w-28 rounded-lg border border-gray-200 px-2 py-1 text-sm"
      >
        {LOCATIONS.map((location) => (
          <option key={location.code} value={location.code}>
            {location.name}
          </option>
        ))}
      </select>

      <label className="sr-only" htmlFor="content">
        속삭임
      </label>
      <textarea
        id="content"
        name="content"
        rows={3}
        maxLength={MAX_CONTENT_LENGTH}
        placeholder="오늘 날씨에 어떤 기분이신가요?"
        className="resize-none rounded-lg border border-gray-200 p-2 text-sm"
      />

      <div className="flex items-center gap-2">
        {state.status !== 'idle' && (
          <p
            role="status"
            className={`text-xs ${
              state.status === 'error' ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {state.message}
          </p>
        )}
        <div className="ml-auto">
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}
