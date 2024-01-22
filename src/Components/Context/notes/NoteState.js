import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
 

  //gett all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')       
      },

      body: JSON.stringify()
    });
    const json = await response.json();
    console.log(json) 
    setNotes(json)      

  };
  //adding a note
  const addNote = async (title, discription, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },

      body: JSON.stringify({ title, discription, tag })
    });
    const note =  await response.json();
   setNotes(notes.concat(note));
  };
  //deleting  a note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", 

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      } });
    const json =  await response.json();
    console.log(json)
    console.log("deletig the note , "  +id);
    const newNote = notes.filter((note) => { return note._id !== id});
    setNotes(newNote);
  };

  //edit a note
  const editNote = async (id, title, discription, tag) => {
    //API Calls
  
    const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body:JSON.stringify({title,discription,tag})
    })
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    //logic to edit bote in client side
    
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].discription = discription;
          newNotes[index].tag = tag;
        }
        break;   
    };
setNotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
