import { useState } from "react"

function NewNote(props) {
	const [note, setNote] = useState("")

	const handleInputChange = (e) => {
		setNote(e.target.value)
	}

	const submitNote = (e) => {
		e.preventDefault()
		props.addNote(note)
		setNote("")
	}

	return (
		<div className="note-item new-note">
			<form onSubmit={submitNote}>
				<input
					type="text"
					name="new-note"
					id="new-note"
					autoComplete="off"
					placeholder="new note"
					onChange={handleInputChange}
					value={note}
					onSubmit={submitNote}
					className={props.colorMode}
				/>
				<button type="submit">Add</button>
			</form>
		</div>
	)
}

export default NewNote
