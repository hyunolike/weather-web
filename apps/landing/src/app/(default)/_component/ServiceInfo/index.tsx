import ServiceModalButton from '../ServiceModalButton'
import ServiceNoticeSlider from '../ServiceNoticeSlider'
import styles from './ServiceInfo.module.scss'

export default function ServiceInfo(): JSX.Element {
  const title = '날씨의 속삭임 서비스 요약'
  const serviceInfoContent =
    '날씨의 속삭임은 "날씨 변화에 따른 다양한 감정과 상황을 익명으로 소통하며 공감대를 형성할 수 있는 커뮤니티"입니다.\n\n\n 회원가입을 통해 날씨의 속삭임을 경험해보세요!'

  return (
    <div className={styles.main}>
      <ServiceNoticeSlider />
      <div className={styles.serviceInfo}>
        <ServiceModalButton
          serviceName="날씨의속삭임 체험하기 (비회원)"
          isDisabled={true}
          isBadge={false}
          url="/flow/trial-user"
        />
        <br />
        <br />
        <br />
        <ServiceModalButton
          serviceName="날씨의속삭임 입장하기 (정회원)"
          isDisabled={false}
          isBadge={true}
          title={title}
          content={serviceInfoContent}
          url="/flow/full-member"
        />
      </div>
    </div>
  )
}
