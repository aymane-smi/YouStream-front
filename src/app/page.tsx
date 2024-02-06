import { LoginButton } from '@/components/auth/login-button'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Home() {
  return (
    <LoginButton />
  )
}
