import React from "react";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import { useState } from "react";
const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    })
    props.showAlert("Added Successfully","success");
  };
  //   ...note spreads the current state of note.
  // [e.target.name]: e.target.value updates the property corresponding to the name attribute of the input field that triggered the event (e). It sets the value of that property to the value of the input field.
  // e.target.value => Get the current value of input field
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value }); // jo bhi name h wo iski value k barabar ho jaae
  };
  return (
    <div className="contaier my-3">
      <h1>Add a note</h1>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
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
            id="description"
            name="description"
            value={note.description}
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
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          
          />
        </div>

        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          AddNote
        </button>
      </form>
    </div>
  );
};

export default AddNote;
