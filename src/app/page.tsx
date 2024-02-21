import CategoryPreview from '@/components/CategoryPreview'
import Hero from '@/components/Hero'
import Newsletter from '@/components/Newsletter'
import Stats from '@/components/Stats'
import Testimonial from '@/components/Testimonial'
import Ongoing from '@/components/Ongoing'
import Ended from '@/components/Ended'
import Upcoming from '@/components/Upcoming'

export default async function Home() {
  const date = new Date()
  const res = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    cache: 'no-store'
  })
  const categories = await res.json()
  const upcoming = await fetch(`${process.env.BACKEND_URL}/api/services?upcoming=${date.toISOString()}`)
  const upcomingService = await upcoming.json()
  const ongoing = await fetch(`${process.env.BACKEND_URL}/api/services?ongoing=${date.toISOString()}`)
  const ongoingService = await ongoing.json()
  const ended = await fetch(`${process.env.BACKEND_URL}/api/services?ended=${date.toISOString()}`)
  const endedService = await ended.json()
  return (
    <main>
      <Hero />
      {/* <CategoryPreview data={categories?.data}/> */}
      <Ongoing data={ongoingService?.data} />
      <Upcoming data={upcomingService?.data} />
      <Ended data={endedService?.data} />
      <Testimonial />
      <Stats />
      <Newsletter />
    </main>
  )
}
