import { useState, useEffect } from "react"
import { v4 as uuid } from "uuid"

import Shortcut from "./Shortcut"
import NewShortcut from "./NewShortcut"

function Shortcuts(props) {
	const [shortcuts, setShortcuts] = useState(JSON.parse(localStorage.getItem("shortcuts")) || [])

	useEffect(() => {
		localStorage.setItem("shortcuts", JSON.stringify(shortcuts))
	}, [shortcuts])

	const addShortcut = (name, link) => {
		let newShortcut = {
			id: uuid(),
			name: name,
			link: link,
		}
		setShortcuts((prevShortcuts) => [...prevShortcuts, newShortcut])
	}

	const deleteShortcut = (id) => {
		setShortcuts((prevShortcuts) =>
			prevShortcuts.filter((shortcut) => {
				return shortcut.id !== id
			})
		)
	}

	return (
    <div className="shortcuts">
			{shortcuts.map((item) => {
				return (
					<Shortcut
						key={item.id}
						id={item.id}
						name={item.name}
						link={item.link}
						deleteShortcut={deleteShortcut}
						colorMode={props.colorMode}
					/>
				)
			})}
			{shortcuts.length < 20 && (
				<NewShortcut addShortcut={addShortcut} colorMode={props.colorMode} />
			)}
		</div>
	)
}

export default Shortcuts
