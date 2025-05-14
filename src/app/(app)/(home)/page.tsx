import { HomeCarousel } from '@/components/shared/home/home-carousel'
import datas from '@/lib/data'

export default async function Page() {
  return (
    <HomeCarousel items={datas.carousels} />
  )
}