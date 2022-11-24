import { useState, useRef, useEffect } from "react"

function NewShortcut(props) {
	const [addNew, setAddnew] = useState(false)
	const [name, setName] = useState("")
	const [link, setLink] = useState("")
	const wrapperRef = useRef(null)

	const resetNew = () => {
		setName("")
		setLink("")
		setAddnew((val) => !val)
	}

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (addNew && wrapperRef.current && !wrapperRef.current.contains(event.target))
				resetNew()
		}

		const handleEsc = (event) => {
			if (addNew && event.keyCode === 27)
				resetNew()
		}

		document.addEventListener("mousedown", handleClickOutside)
		document.addEventListener("keydown", handleEsc)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
			document.removeEventListener("keydown", handleEsc)
		}
	}, [addNew])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (name !== "" && link !== "") {
			props.addShortcut(name, link)
			resetNew()
		}
	}

	return (
		<div ref={wrapperRef} className="shortcut-item-wrapper" onClick={() => setAddnew(true)}>
			{addNew ? (
				<form className={`shortcut-form ${props.colorMode}`} onSubmit={handleSubmit}>
					<input
						type="text"
						name="name"
						id="new-name"
						placeholder="name"
						autoComplete="off"
						onChange={(e) => {
							setName(e.target.value)
						}}
						value={name}
						onSubmit={handleSubmit}
					/>
					<input
						type="text"
						name="link"
						id="new-link"
						placeholder="link"
						autoComplete="off"
						onChange={(e) => {
							setLink(e.target.value)
						}}
						value={link}
						onSubmit={handleSubmit}
					/>
					<button type="submit">Add shortcut</button>
				</form>
			) : (
				<div className={`shortcut-item ${props.colorMode} new-shortcut-item`}>
					<h1>+</h1>
					<p>Add new</p>
				</div>
			)}
		</div>
	)
}

export default NewShortcut
