import React from 'react'

function Note(props) {
  return (
	<div className='note-item note'>
		<p>{props.noteText}</p>
		<span className={`delete-button ${props.colorMode}`} onClick={() => {props.deleteNote(props.id)}}>+</span>
	</div>
  )
}

export default Note