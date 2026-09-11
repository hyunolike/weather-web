'use client'

import styles from './Modal.module.scss'
import Image from 'next/image'
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Input,
  Link,
  Modal as NextModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react'
import { MdMail } from 'react-icons/md'
import { GoAlertFill } from 'react-icons/go'
import { useActionState, useState } from 'react'
import onSubmit from '@/app/(default)/_lib/signup'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'

export default function Modal() {
  const router = useRouter()

  // 모달 상태값 (입장하기 이후 동작 처리)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleClose = () => {
    router.back()
  }

  // useFormStatus
  // useActionState
  const initialState: { message: string } = {
    message: '',
  }

  // 카나리 버전으로 불안정
  // const [state, formAction] = useActionState(onSubmit, initialState);
  // const {pending} = useFormStatus();

  // server action
  const submit = onSubmit

  // 이메일 상태값
  const [email, setEmail] = useState('')
  const onChangEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  // 모달 배경 클릭 시 메인으로 리다이렉트
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back()
    }
  }

  return (
    <div className={styles.modalBackgroud} onClick={handleBackgroundClick}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div>
            {/* Next.js 이미지 최적화 */}
            <Image src="/images/logo.png" alt="logo" width={100} height={100} />
          </div>
          <div className={styles.modalTitle}>날씨의 속삭임 입장하기</div>
          <div className={styles.modalInfo}>
            <p>날씨의 속삭임 회원만을 위한 공간이에요.</p>
            <p>오픈이후 순차적으로 가입 알림이 발송될 예정입니다.</p>
          </div>
        </div>
        <div className={styles.modalServiceSection}>
          <div className={styles.modalServiceInfo}>
            현재 대기인원은 00명 입니다. 🧑🏻‍💻 새로운 차원의 경험 오직 날씨의
            속삭임에서만
          </div>
        </div>
        <div>
          {/* server action */}
          <form className={styles.modalEmailSection} action={submit}>
            <div className={styles.modalEmailForm}>
              <Input
                type="email"
                label="이메일"
                placeholder="you@example.com"
                labelPlacement="outside"
                name="email" //이 값을 이용해 데이터 처리 (server action)
                value={email}
                startContent={
                  <MdMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                isClearable
                onChange={onChangEmail}
              />
            </div>
            <div className={styles.modalEmailBtnSection}>
              <Button
                type="submit"
                className={styles.modalEmailButton}
                onPress={onOpen}
              >
                입장하기
              </Button>
              <NextModal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent className="font-laundry-regular flex justify-center items-center">
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        <div className="flex justify-center text-amber-500">
                          <GoAlertFill className="w-10 h-10" />
                        </div>
                        <div>날씨의속삭임 서비스 이용 사전 안내</div>
                      </ModalHeader>
                      <ModalBody>
                        <p>
                          안정적인 서비스 제공을 위해 입장하기 기능이
                          제한됩니다.
                          <br />
                          서비스 출시 전까지는 가급적 이용을 삼가해 주시기
                          바랍니다.
                        </p>
                        <br />
                        안정적인 서비스 제공으로 보답하겠습니다. <br />
                        감사합니다. :)
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          닫기
                        </Button>
                        <Button
                          className="bg-black text-white"
                          onPress={onClose}
                          onClick={() => handleClose()}
                        >
                          확인
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </NextModal>
            </div>
          </form>
          <div className={styles.modalFullM}>
            <Card>
              <CardHeader className={styles.modalFullMInfo}>
                <Link isExternal showAnchorIcon href="/">
                  날씨의 속삭임 입장하기 알아보기
                </Link>
              </CardHeader>
              <CardFooter className={styles.modalInfo}>
                <p>입장하기 프로세스에 대해 알려드리고 있어요!</p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
