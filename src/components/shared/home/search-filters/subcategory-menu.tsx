import { Category } from "@/payload-types";
import { CustomCategory } from "@/app/(app)/(home)/types";
import Link from "next/link";

interface SubcategoryMenuProps {
  category: CustomCategory;
  isOpen: boolean;
  position: { top: number, left: number }
}

export const SubcategoryMenu = ({
  category,
  isOpen,
  position
}: SubcategoryMenuProps) => {
  if(!isOpen || !category.subcategories || category.subcategories.length === 0) {
    return null;
  }
  
  const backgroundColor = category.color || "#F5F5F5" // F5F5F5 est un gris clair
  
  return (
    <div
      className="fixed z-[100]" // z-index standardisé (Tailwind)
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      {/* Maintenir un pont invisible pour conserver le survol */}
      <div className="h-3 w-60" /> {/* w-60 correspond à 240px */}
      <div
        style={{ backgroundColor }}
        // Ajout de max-h-96 et overflow-y-auto ici
        className="w-60 text-black rounded-md overflow-hidden border border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px] max-h-120 overflow-y-auto">
        {category.subcategories?.map((subcategory: Category) => (
          <Link
            key={subcategory.slug} // Il est préférable d'utiliser l'ID pour la clé si disponible et unique
            href={`/${category.slug}/${subcategory.slug}`} // Exemple de Href dynamique
            className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center font-medium" // 'underline' a été retiré, car hover:bg-black le rend moins visible
          >
            {subcategory.name}
         </Link>
       ))}
      </div>
    </div>
  )
}