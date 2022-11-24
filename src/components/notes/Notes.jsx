import {useState, useEffect} from 'react'
import { v4 as uuid } from 'uuid';

import NewNote from './NewNote'
import Note from './Note'


function Notes(props) {

  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  const addNote = (noteText) => { 
    let newNote = {
      id: uuid(),
      text: noteText
    }
    setNotes([newNote, ...notes])
  }

  const deleteNote = (noteId) => {
    setNotes(notes.filter(note => {
      return note.id !== noteId
    }))
  }

  return (
	<div className={`notes component ${props.colorMode}`}>
    <h1>Notes</h1>
    {
      notes.map(note => {
        return <Note key={note.id} id={note.id} noteText={note.text} deleteNote={deleteNote} colorMode={props.colorMode}/>
      })
    }
    <NewNote addNote={addNote} colorMode={props.colorMode}/>
  </div>
  )
}

export default Notes