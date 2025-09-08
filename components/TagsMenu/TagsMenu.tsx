"use client"

import { Routes } from "@/config/routes"
import css from "./TagsMenu.module.css"
import { Tags } from "@/lib/api"
import Link from "next/link"
import { useState } from "react"

interface TagsMenuProps {
	categories: Tags
}

const TagsMenu = ({ categories }: TagsMenuProps) => {
	const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false)

	const handleClick = () => {
		setIsNotesOpen(!isNotesOpen)
	}

	return (
		<div className={css.menuContainer}>
			<button className={css.menuButton} onClick={handleClick}>
				Notes {isNotesOpen ? "▾" : "▴"}
			</button>
			{isNotesOpen && categories && (
				<ul className={css.menuList}>
					{categories.map(category => (
						<li key={category} className={css.menuItem}>
							<Link
								href={Routes.NotesFilter + category}
								scroll={false}
								className={css.menuLink}
								onClick={() => setIsNotesOpen(false)}>
								{category}
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default TagsMenu