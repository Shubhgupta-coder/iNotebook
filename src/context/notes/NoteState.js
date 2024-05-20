import React, { useState } from "react";
import NoteContext from "./noteContext";
// import { useContext } from "react";
// import { useState } from "react";
//ye jo Notestate h ye note ki saari state ko provide kregi
const NoteState=(props)=>{

  const host = "http://localhost:5000";
  // This all commented code is for understand context hook
  // const s1={
  //   name:"shubh",
  //   "  ":"12th"
  // }

  // const [state,setState]=useState(s1);
  // const update=()=>{
  //   setTimeout(() => {
  //     setState({
  //       "name":"Larry",
  //       "class":"10b"
  //     })
  //   }, 1000);
  // }


  const notesInitial = []
    

  const [notes,setNotes]=useState(notesInitial)

  // Get a note
  const getNotes= async()=>{
    //Todo : API CALL
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')        
      }
    }
    );
 
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }

  // Add a note
  const addNote=async(title,description,tag)=>{
    // Todo : API CALL
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
        
      },
      body: JSON.stringify({title,description,tag})
    });
    const note = await response.json();
   
    setNotes(notes.concat(note))
  }

  //Delete a note
  
  const deleteNote=async(id)=>{
    // API CALL
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
     
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
      },
    });
    const json= response.json();
    console.log(json)

    console.log("deleting the note with id"+id)
     const newNotes=notes.filter((note)=>{return note._id!==id})
     setNotes(newNotes)
  } 

  //Edit note
  const editNote=async(id,title,description,tag)=>{
    // API CALL  
 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
     
      headers: {
        "Content-Type": "application/json",
       "auth-token":localStorage.getItem('token')
        
      },
    
      body: JSON.stringify({title,description,tag})
    });
    const json= await response.json();
    console.log(json);

    let newNotes=JSON.parse(JSON.stringify(notes));  // isse iski deep copy bn jaaegi [react m hm direct state ko update nhi kr skte]
    // LOGIC to EDIT IN CLIENT
      for(let index = 0 ; index<newNotes.length ; index++)
      {
        const element = notes[index];
        if(element._id===id)
        {
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].tag=tag;
          break;
        } 
      }
      setNotes(newNotes);
  }

  // /// is function k andar jo bhi cheez ham provide krna chate h usko value={} k andar daal do
  // // jb bhi hm iss context k andar kisi bhi cheez ko wrap kroge uske andar uske beech mm automatically saare k saare children aa jaaengw
    return(
      // for learn context api =>video 58
  //       <NoteContext.Provider value={{state:state,update:update}}>
  //         {props.children};
  //       </NoteContext.Provider>


        <NoteContext.Provider value={{notes,addNote,deleteNote,editNote,getNotes}}>
          {console.log(props)}
          {props.children};
        </NoteContext.Provider>
     )
}

export default NoteState;