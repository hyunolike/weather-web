'use client'

import { useEffect, useState } from 'react'
import styles from './MainTitle.module.scss'

const CONTENT: string[] = [
  '연결되는 공간',
  '날씨를 공유하는 공간',
  '즐거움을 느끼는 공간',
]
const TYPING_DELAY = 200
const RESTART_DELAY = 1000

export default function MainTitle(): JSX.Element {
  // DOM 직접 조작 대신 상태로 관리 (한 줄씩 타이핑된 결과)
  const [lines, setLines] = useState<string[]>([''])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    let lineIndex = 0
    let charIndex = 0

    setLines([''])

    const typing = (): void => {
      // 마지막 줄까지 끝나면 잠시 멈췄다가 처음부터 다시 시작
      if (lineIndex >= CONTENT.length) {
        timer = setTimeout(() => {
          lineIndex = 0
          charIndex = 0
          setLines([''])
          timer = setTimeout(typing, TYPING_DELAY)
        }, RESTART_DELAY)
        return
      }

      const line = CONTENT[lineIndex]

      if (charIndex < line.length) {
        const char = line[charIndex]
        charIndex += 1
        setLines((prev) => [...prev.slice(0, -1), prev[prev.length - 1] + char])
      } else {
        lineIndex += 1
        charIndex = 0
        setLines((prev) => [...prev, ''])
      }

      timer = setTimeout(typing, TYPING_DELAY)
    }

    timer = setTimeout(typing, TYPING_DELAY)

    // 언마운트 시 타이머 정리 (StrictMode 이중 실행에도 안전)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={styles.main}>
      <div className={styles.title}>날씨의 속삭임 🌤️</div>
      <div>
        <div className={styles.subtitle}>날씨의 속삭임 구성원들과</div>
        <div className={styles.description}>
          <div>
            {lines.map((line, index) => (
              <span key={index}>
                {line}
                {index < lines.length - 1 && <br />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
