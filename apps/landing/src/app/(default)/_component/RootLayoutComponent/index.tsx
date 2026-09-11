import styles from './RootLayout.module.scss'

export default function RootLayoutComponent({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.root}>{children}</div>
}
