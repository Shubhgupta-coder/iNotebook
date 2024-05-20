import React from "react";
import { useContext } from "react";
import { useRef } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNotes,editNote } = context;

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
       history("/login")
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose=useRef(null);  // for closing our MOdal => edit notes
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:"default"})


  // Here we are updating our notes

  const updateNote = (currentNote) => {
    ref.current.click(); // ref.current() means kaha pr ye jo reference wo point krra h
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});  //yaha pr jo hamari phele notewaali valuethi wo hi aajaegi
  
  };

  const handleClick = (e) => {
    console.log("Updating th note",note);
    editNote(note.id,note.etitle,note.edescription,note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully","success")
    e.preventDefault();
    
  };
  //   ...note spreads the current state of note. 
  // [e.target.name]: e.target.value updates the property corresponding to the name attribute of the input field that triggered the event (e). It sets the value of that property to the value of the input field.
  // e.target.value => Get the current value of input field
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // jo bhi name h wo iski value k barabar ho jaae
  };
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      {/* useref ki help se hamare is button p click hora h */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* yaha pr maine bootstrap se toggle uthaya h */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>  
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}   //hyaha pr i/p fieldm jpo hamare phele notre ki val thi wo aarih 
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}   //hyaha pr i/p fieldm jpo hamare phele notre ki val thi wo aarih
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}  //hyaha pr i/p fieldm jpo hamare phele notre ki val thi wo aarih
                    onChange={onChange}
                    
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row my-3">
          <h1>Your Notes</h1>
          <div className="container">
          {notes.length===0 && 'No notes to display'}
          </div> 
          {notes.map((note) => {
            return (
              <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
            ); // passing notes as props  // id ids unique (mongo db se _id se aati h)
          })}
        </div>
      </div>
    </>
  );
};
export default Notes;
