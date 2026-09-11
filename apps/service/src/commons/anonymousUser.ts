import 'server-only'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'wsp_uid'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 // 1년

/**
 * 익명 사용자 ID 를 읽는다. 아직 발급받지 않았다면 null.
 * 서버 컴포넌트에서는 쿠키를 쓸 수 없으므로 읽기 전용으로만 사용한다.
 */
export const getAnonymousId = (): string | null =>
  cookies().get(COOKIE_NAME)?.value ?? null

/**
 * 익명 사용자 ID 를 보장한다. 없으면 새로 발급하고 쿠키에 심는다.
 * 쿠키 쓰기가 허용되는 server action / route handler 에서만 호출할 수 있다.
 */
export const ensureAnonymousId = (): string => {
  const existingId = getAnonymousId()
  if (existingId) return existingId

  const id = randomUUID()
  cookies().set(COOKIE_NAME, id, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })
  return id
}
