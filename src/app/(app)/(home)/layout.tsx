import configPromise from '@payload-config'
import {getPayload} from 'payload'
import { Category } from '@/payload-types'

import Header from '@/components/shared/header'
import Footer from '@/components/shared/footer'
import { SearchFilters } from '@/components/shared/home/search-filters'

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
    depth: 2,
    pagination: false,
    where: {
      parent: {
        exists: false
      }
    }
  })

  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined
    }))
  }))
  

  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <SearchFilters data={formattedData} />
      <main className='flex-1 flex flex-col'>{children}</main>
      <Footer />
    </div>
  )
}

export default HomeLayout