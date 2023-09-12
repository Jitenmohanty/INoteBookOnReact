import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../Context/notes/notesContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getAllNotes, editNote } = context;
  const ref = useRef(null);
  const refCloseModal = useRef(null);
  let navigate = useNavigate();
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refCloseModal.current.click();
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  useEffect(() => {
    if(localStorage.getItem('token')){
      getAllNotes();
    }
    else{
      navigate('/login')
    }
  }, [getAllNotes]);

  return (
    <div>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

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
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value={note.etitle}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Descriptions
                  </label>
                  <input
                    type="text"
                    value={note.edescription}
                    className="form-control"
                    name="edescription"
                    id="edescription"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value={note.etag}
                    className="form-control"
                    name="etag"
                    id="etag"
                    onChange={onChange}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refCloseModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <h1> Your Notes : </h1>
        {notes.map((note, index) => {
          return <NoteItem note={note} updateNote={updateNote} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Notes;
