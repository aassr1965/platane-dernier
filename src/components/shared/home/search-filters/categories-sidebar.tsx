import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CustomCategory } from "@/app/(app)/(home)/types";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn, getTextColorForBackground } from "@/lib/utils";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: CustomCategory[]
}

export const CategoriesSidebar = ({
  open,
  onOpenChange,
  data
}: Props) => {
  const router = useRouter()
  const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null)
  const [selectedCategories, setSelectedCategories] = useState<CustomCategory | null>(null)

  // if we have parent categories, show those, oteherwise show root category

  const currentCategories = parentCategories ?? data ?? []

  const handleOpenChange = (open: boolean) => {
    setSelectedCategories(null)
    setParentCategories(null)
    onOpenChange(open)

  }

  const handleCategoryClick = (category: CustomCategory) => {
    if (category.subcategories && category.subcategories.length > 0) {
      setParentCategories(category.subcategories as CustomCategory[])
      setSelectedCategories(category)
    } else {
      if (parentCategories && selectedCategories) {
        router.push(`/${selectedCategories.slug}/${category.slug}`)
      } else {
        if (category.slug === "all") {
          router.push("/")
        } else {
          router.push(`/${category.slug}`)
        }
      }
      handleOpenChange(false)
    }
  }

  const handleBackClick = () => {
    if (parentCategories) {
      setParentCategories(null)
      setSelectedCategories(null)
    }
  }
  const backgroundColor = selectedCategories?.color || "white"
  const textColorClass = backgroundColor === "white"
    ? "text-gray-900"
    : getTextColorForBackground(backgroundColor)

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className={cn("p-0 transition-none", textColorClass)}
        style={{ backgroundColor }}
      >
        <SheetHeader className={cn("p-4 border-b", textColorClass)}>
          <SheetTitle className={cn("text-lg font-bold", textColorClass)}>
            Catégories
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className={cn(
                "w-full text-left p-4 cursor-pointer flex items-center text-base font-medium",
                textColorClass,
                "hover:bg-black hover:text-white"
              )}
            >
              <ChevronLeftIcon className={cn("size-4 mr-2", textColorClass)} />
              Retour
            </button>
          )}
          {currentCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => handleCategoryClick(category)}
              className={cn(
                "w-full text-left p-4 flex items-center justify-between text-base font-medium cursor-pointer",
                textColorClass,
                "hover:bg-black hover:text-white"
              )}
            >
              {category.name}
              {category.subcategories && category.subcategories.length > 0 && (
                <ChevronRightIcon className={cn("size-4 ml-2", textColorClass)} />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}