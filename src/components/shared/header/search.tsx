import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { APP_NAME } from '@/lib/constants'
import { CategoriesSidebar } from '../home/search-filters/categories-sidebar'
import { CustomCategory } from '@/app/(app)/(home)/types'
import { Input } from '@/components/ui/input'
import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface Props {
  disabled?: boolean;
  data: CustomCategory[]; // Added data prop for categories
}

export default function Search({ disabled, data }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Prepare categories for the Select dropdown, excluding "all" if handled separately
  const selectCategories = data.filter(cat => cat.slug !== 'all');

  return (
    <>
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} data={data} />
      <form
        action='/search'
        method='GET'
        className='flex items-stretch h-10 w-full'
      >
        {/* Category Select: Visible on LG and up */}
        <div className="hidden lg:flex">
          <Select name='category'>
            <SelectTrigger
              className={cn(
                'w-auto h-full bg-gray-100 text-black py-[19px]',
                'border border-gray-300 dark:border-gray-200',
                'rounded-l-md rounded-r-none', // First item on desktop
                'focus:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0' // Shadcn focus style
              )}
            >
              <SelectValue placeholder='All' />
            </SelectTrigger>
            <SelectContent position='popper'>
              <SelectItem value='all'>All</SelectItem>
              {selectCategories.map((category) => (
                <SelectItem key={category.id} value={category.slug}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Input
          className={cn(
            'flex-1 bg-gray-100 text-black text-base h-full',
            'border border-gray-300 dark:border-gray-200',
            // On LG (desktop), it follows Select
            'lg:rounded-l-none lg:border-l-0',
            // On mobile (not LG), it's the first item
            'rounded-l-md lg:rounded-l-none', // This ensures mobile has rounded-l
            'rounded-r-none' // Always has an element to its right (MobileButton or SearchSubmit)
          )}
          placeholder={`Rechercher sur ${APP_NAME}`}
          name='q'
          type='search'
          disabled={disabled}
        />

        <div className="flex items-center gap-2">
          <button
            type='submit'
            className={cn(
              'bg-primary text-primary-foreground h-full px-3 py-2',
              'border border-primary dark:border-primary border-l-0', // Connects to previous item's right border
              'rounded-r-md rounded-l-none'
            )}
          >
            <SearchIcon className='w-6 h-6' />
          </button>
          {/* Mobile Filter Button: Visible on mobile (not LG), between Input and Search Submit */}
          <Button
            variant="elevated"
            onClick={() => setIsSidebarOpen(true)}
            className={cn(
              'flex items-center justify-center bg-gray-100 text-black px-3 h-full',
              'border border-gray-300 dark:border-gray-200 border-l-0', // Connects to Input's right border
              'lg:hidden',
              'rounded-md bg-primary' // Middle item on mobile
            )}
          >
            <ListFilterIcon className="h-5 w-5" />
          </Button>
        </div>

      </form>
    </>
  )
}