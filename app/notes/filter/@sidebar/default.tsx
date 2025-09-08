import Link from "next/link"
import css from "./Sidebar.module.css"
import { getCategories, type Tag } from "@/lib/api"
import { Routes } from "@/config/routes"

const SidebarNotes = async () => {
  const categories = await getCategories();;

  return (
    <ul className={css.menuList}>
      {categories.map((category: Tag) => (
        <li key={category} className={css.menuItem}>
          <Link
            href={`${Routes.NotesFilter}${category}`}
            scroll={false}
            className={css.menuLink}
          >
            {category}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default SidebarNotes