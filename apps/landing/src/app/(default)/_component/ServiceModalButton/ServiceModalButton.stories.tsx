import type { Meta, StoryObj } from '@storybook/react'
import ServiceModalButton from './index'

const meta: Meta<typeof ServiceModalButton> = {
  title: 'ServiceModalButton',
  component: ServiceModalButton,
}

export default meta

type Story = StoryObj<typeof ServiceModalButton>

export const 입장하기: Story = {
  args: {
    serviceName: '날씨의속삭임 입장하기 (정회원)',
    isDisabled: false,
    isBadge: true,
    title: '날씨의 속삭임 서비스 요약',
    content:
      '날씨의 속삭임은 "날씨 변화에 따른 다양한 감정과 상황을 익명으로 소통하며 공감대를 형성할 수 있는 커뮤니티"입니다.\n\n\n 회원가입을 통해 날씨의 속삭임을 경험해보세요!',
    url: '#',
  },
}

export const 체험하기: Story = {
  args: {
    serviceName: '날씨의속삭임 체험하기 (비회원)',
    isDisabled: false,
    isBadge: true,
    title: '날씨의 속삭임 서비스 요약',
    content:
      '날씨의 속삭임은 "날씨 변화에 따른 다양한 감정과 상황을 익명으로 소통하며 공감대를 형성할 수 있는 커뮤니티"입니다.\n\n\n 회원가입을 통해 날씨의 속삭임을 경험해보세요!',
    url: '#',
  },
}

export const 체험하기_비활성화: Story = {
  args: {
    serviceName: '날씨의속삭임 체험하기 (비회원)',
    isDisabled: true,
    isBadge: true,
    title: '날씨의 속삭임 서비스 요약',
    content:
      '날씨의 속삭임은 "날씨 변화에 따른 다양한 감정과 상황을 익명으로 소통하며 공감대를 형성할 수 있는 커뮤니티"입니다.\n\n\n 회원가입을 통해 날씨의 속삭임을 경험해보세요!',
    url: '#',
  },
}
