'use server'

// server action 테스트 코드
const signup = async (formData: FormData): Promise<{ message: string }> => {
  const email = formData.get('email')

  if (typeof email !== 'string' || email.trim() === '') {
    return { message: '이메일을 입력해 주세요.' }
  }

  // server action 은 서버에서 실행되므로 브라우저 msw 가 아닌
  // standalone mock 서버(pnpm mock)를 바라봐야 한다.
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  if (!baseUrl) {
    return { message: '서버 설정 오류 (NEXT_PUBLIC_BASE_URL 미설정)' }
  }

  try {
    const response = await fetch(`${baseUrl}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      return { message: `서버 오류 (${response.status})` }
    }

    return { message: '서버 성공' }
  } catch (err) {
    return { message: '서버 오류' }
  }
}

export default signup
