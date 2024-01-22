import React, { useState } from "react";
import { useContext } from "react";
import noteContext from "../Components/Context/notes/noteContext";
const AddNot = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", discription: "", tag: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.discription, note.tag);
    setNote({ title: "", discription: "", tag: "" })


  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="margin">
        <div className="container my-4">
          <h1>Add Notes</h1>
        </div>
       
          <form className="my-3">

            <div className="mb-3 ">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="  Your Title"
                name="title"
                onChange={onChange}
                minLength={5}
                required 
                value={note.title}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="=discription" className="form-label">
                Discription
              </label>

              <input
                type="text"
                className="form-control"
                id="discription"
                placeholder=" Your Discription"
                name="discription"
                onChange={onChange}
                minLength={5}
                required 
                value={note.discription}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="=Tag" className="form-label">
                Tag
              </label>

              <input
                type="text"
                className="form-control"
                id="tag"
                placeholder=" Your Tag"
                name="tag"
                onChange={onChange}
           value={note.tag}
       
              required
              />
            </div>
            <div className="col-auto">
              <button
                type="submit"
                className="btn  bg  mb-3"
                onClick={handleclick}
                disabled ={ note.title.length<5||note.discription.length<5}
              >
                Add Note
              </button>
            </div>
          </form>
        </div>

      </div>
    
  );
};

export default AddNot;
