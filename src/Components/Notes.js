import React, {  useRef,useState} from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Notesitem from "./Notesitem";
import noteContext from "../Components/Context/notes/noteContext";
import AddNote from "./AddNot";
import { useHistory } from 'react-router-dom'

const Notes = () => {
  const context = useContext(noteContext);
  let history =  useHistory()
  const { notes, getNotes,editNote  } = context;
  useEffect(() => {
    if(localStorage.getItem('auth-token')){
    getNotes();}
    else{
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [])
  const [note, setNote] = useState({ id:"" , etitle: "", ediscription: "" });
  const handleclick = () => {
    console.log("updating the note",note)
    editNote(note.id , note.etitle,note.ediscription, note.etag)
    refClose.current.click()
    

  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
       const updateNote =(currentNote)=>{
     ref.current.click()
     setNote({id:currentNote._id,etitle:currentNote.title, ediscription:currentNote.discription})
  }
const ref = useRef(null)  
const refClose=useRef(null)
  

  return (
    <>
      <AddNote />
     

<button type="button"  ref= {ref} className="btn btn-primary d-none " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Launch static backdrop modal
</button>

<div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1  className="modal-title  modalclr fs-5" id="staticBackdropLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form className="my-3">

<div className="mb-3 ">
  <label htmlFor="title" className=" modalclr form-label">
    Title
  </label>
  <input
    type="text"
    className="form-control"
    id="etitle"
    placeholder="  Update Title"
    name="etitle"
    value={note.etitle}
    onChange={onChange}
    minLength={5}
   
  />
</div>
<div className="mb-3">
  <label htmlFor="=discription" className=" modalclr form-label">
    Discription
  </label>

  <input
    type="text"
    className="form-control"
    id="ediscription"
    placeholder=" Update Discription"
    name="ediscription"
    value={note.ediscription}
    onChange={onChange}
    minLength={5}
 
  />
</div>
 </form>
      </div>
      <div className="modal-footer">
        <button  ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  disabled ={ note.etitle.length<5||note.ediscription.length<5}type="button" className=" btnclr btn" onClick={handleclick}>Update Note</button>
      </div>
    </div>
  </div>
</div>

      <div className=" row   mx-3 my-3">
        {notes.map((note) => {
          return <Notesitem updateNote={updateNote} key={note._id} note={note} />;
        })}
      </div>
    </>
  );
};

export default Notes;
