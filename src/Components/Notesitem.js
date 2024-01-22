import React from "react";
import { useContext } from "react";
import noteContext from "../Components/Context/notes/noteContext";
const Notesitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  return (
    <div className="col-md-4 ">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title} </h5>
          <p className="card-text">{note.discription}</p>
          <i
            className="fa-solid iconsclr fa-lg  fa-trash-can mx-2"
            onClick={() => {
              deleteNote(note._id)
            }}
          ></i>
          <i className="fa-solid iconsclr  mx-2 fa-lg fa-pen-to-square" onClick={()=>{
            updateNote(note)
          }}></i>
        </div>
      </div>
    </div>
  );
};

export default Notesitem;
