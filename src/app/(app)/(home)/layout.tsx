import { Category } from '@/payload-types'
import { CustomCategory } from './types'
import Footer from '@/components/shared/footer'
import Header from '@/components/shared/header'
import { SearchFilters } from '@/components/shared/home/search-filters'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

interface Props {
  children: React.ReactNode
}

const HomeLayout = async ({
  children,
}: Props) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const data = await payload.find({
    collection: 'categories',
    depth: 3,
    pagination: false,
    where: {
      parent: {
        exists: false
      }
    },
    sort: 'createdAt',
  })

  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
    }))
  }))

  
  return (
    <div className='flex flex-col min-h-screen'>
      <Header categoryData={formattedData} />
      <SearchFilters data={formattedData} />
      <main className='flex-1 flex flex-col'>{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout