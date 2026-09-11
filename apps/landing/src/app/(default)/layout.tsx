import RootLayoutComponent from './_component/RootLayoutComponent'

type Props = {
  children: React.ReactNode
  modal: React.ReactNode
}

// 모달 기능 페러렐 라우트 레이아웃 추가
export default function RootLayout({ children, modal }: Props) {
  return (
    <RootLayoutComponent>
      <div>
        {children}
        {modal}
      </div>
    </RootLayoutComponent>
  )
}
