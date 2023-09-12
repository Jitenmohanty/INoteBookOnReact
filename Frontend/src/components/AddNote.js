import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/notesContext";
import { toast } from "react-hot-toast";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    toast.success("Note Added Sucessfully");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3" >
        <h1>Add Your Notes</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title *
            </label>
            <input
               style={{ border: "2px solid #a8ada9",maxWidth:'30rem' }}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Descriptions *
            </label>
            <textarea
              type="text"
              style={{ border: "2px solid #a8ada9",maxWidth:'30rem',height:'8rem',  }}   
              className="form-control"
              name="description"
              id="description"
              onChange={onChange}
              value={note.description}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>
            <input
               style={{ border: "2px solid #a8ada9",maxWidth:'30rem' }}
              type="text"
              className="form-control"
              name="tag"
              id="tag"
              onChange={onChange}
              value={note.tag}
              required
            />
          </div>
          <button
            disabled={note.title === "" || note.description == ""}
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
