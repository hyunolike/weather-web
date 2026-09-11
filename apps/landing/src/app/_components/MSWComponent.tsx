'use client'
import { useEffect } from 'react'

// StrictMode 의 이펙트 이중 실행으로 worker.start() 가 중복 호출되는 것을 막는다.
let isWorkerStarted = false

export const MSWComponent = () => {
  useEffect(() => {
    // `typeof window !== 'undefined'` 중첩은 그대로 두어야 한다.
    // msw/browser 는 node 조건에서 export 되지 않아, 이 분기가 서버 번들에서
    // 죽은 코드로 제거되어야만 빌드가 통과한다.
    if (typeof window !== 'undefined') {
      //클라이언트 환경에서만 실행 (브라우저)
      if (
        process.env.NEXT_PUBLIC_API_MOCKING === 'enabled' &&
        !isWorkerStarted
      ) {
        isWorkerStarted = true
        //클라이언트 환경에서 네트워크 가로채기를 위한 msw 설정
        //(setupWorker 만으로는 동작하지 않고 start() 까지 호출해야 한다)
        const worker = require('@/mocks/browser').default
        worker.start({ onUnhandledRequest: 'bypass' })
      }
    }
  }, [])

  return null
}
