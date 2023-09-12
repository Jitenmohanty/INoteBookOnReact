import { useState } from "react";
import NoteContext from "./notesContext";
import { toast } from "react-hot-toast";

const NoteState = ({ children }) => {
  const host = "http://localhost:3005";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const allNotes = await response.json();
    setNotes(allNotes);
  };

  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const addNotes = await response.json();
    setNotes(notes.concat(addNotes));
  };
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    const delNote = await response.json();
    console.log(delNote);
    const newNote = notes.filter((note) => note._id !== id);
    toast.error("Notes Deleted Successfully");
    setNotes(newNote);
  };

  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
      body: JSON.stringify({ id, title, description, tag }),
    });
    const newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setNotes(newNotes);
    }
    toast.success("Notes Updated Successfully");
  };
  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getAllNotes }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default NoteState;
