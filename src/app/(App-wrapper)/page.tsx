import { ResponsiveCarousel } from '@/components/Carousel/Carousel'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export default function Home() {
  return (
    <main className="ml-[200px] w-full max-w-calc[100vw-200px]">
      <ResponsiveCarousel />
    </main>
  )
}
