import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    // pnpm workspace 에서는 @nextui-org/theme 가 워크스페이스 루트로 호이스팅된다.
    // 두 경로를 모두 넣어야 앱 단독 설치와 모노레포 모두에서 스타일이 생성된다.
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // 랜딩페이지와 동일한 폰트
      fontFamily: {
        'laundry-regular': ['LaundryGothic-Regular', 'sans-serif'],
        'laundry-bold': ['LaundryGothic-Bold', 'sans-serif'],
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
export default config
