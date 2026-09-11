import type { Preview } from '@storybook/react'
import '@/app/globals.css' // Import global styles (NextUI 적용 필수값)
// NextUI는 tailwindcss를 기반으로 하기 때문에, tailwindcss의 기본값을 불러와야 한다.
import './style.scss'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
