'use client'

import Link from 'next/link'
import styles from './ServiceModalButton.module.scss'
import { Badge, Button, Tooltip } from '@nextui-org/react'

interface ServiceModalButtonProps {
  serviceName: string
  isDisabled?: boolean
  isBadge?: boolean
  title?: string
  content?: string
  url: string
}

export default function ServiceModalButton({
  serviceName,
  isDisabled,
  isBadge,
  title,
  content,
  url,
}: ServiceModalButtonProps): JSX.Element {
  const buttonStyle = isDisabled ? styles.disabled : styles.main

  // Button 안에 Link 를 중첩하면 비활성화 상태에서도 이동이 가능해진다.
  // 활성화 상태일 때만 Link 로 렌더링해 중첩 없이 처리한다.
  const linkProps = isDisabled ? {} : { as: Link, href: url }

  const button = (
    <Button
      {...linkProps}
      className={buttonStyle}
      radius="sm"
      size="lg"
      isDisabled={isDisabled}
    >
      {serviceName}
    </Button>
  )

  const tooltip = (
    <Tooltip
      color={'warning'}
      closeDelay={isBadge ? 1000 : 500}
      content={
        <div className="px-1 py-2">
          <div className="text-small font-bold">{title}</div>
          <div className="text-tiny">{content}</div>
        </div>
      }
      placement={'bottom'}
    >
      {button}
    </Tooltip>
  )

  return isBadge ? (
    <Badge content="신규" color="danger">
      {tooltip}
    </Badge>
  ) : (
    tooltip
  )
}
