import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function submitHandler(e) {
    e.preventDefault();
    const { title, description } = e.target.elements;
    console.log(title.value, description.value);

    axios
      .post("http://localhost:8000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
    title.value = "";
    description.value = "";
    //axios.post('url', {body})
  }

  function deleteHandler(noteId) {
    axios.delete("http://localhost:8000/api/notes/" + noteId).then((res) => {
      // console.log(res.data);
      fetchNotes();
    });
  }

  console.log("hello integration");

  function fetchNotes() {
    axios.get("http://localhost:8000/api/notes").then((res) => {
      setNotes(res.data.allFetchedNotes);
    });
  }

  function updateTitleHandler(noteId) {
    let updatedText = prompt("Update Title");
    if (updatedText === "") return;
    axios
      .patch("http://localhost:8000/api/notes/" + noteId, {
        title: updatedText,
      })
      .then((res) => {
        fetchNotes();
      });
  }
  function updateDescriptionHandler(noteId) {
    let updatedDescription = prompt("Update Description");
    if (updatedDescription === "") return;
    axios
      .patch("http://localhost:8000/api/notes/" + noteId, {
        description: updatedText,
      })
      .then((res) => {
        fetchNotes();
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <form className="note-create-from" onSubmit={submitHandler}>
        <input name="title" type="text" placeholder="Enter Title" />
        <input name="description" type="text" placeholder="Enter Description" />
        <button>Create Note</button>
      </form>
      <div className="notes">
        {notes.map((note, idx) => {
          return (
            <div key={idx} className="note">
              <div className="title">
                <h1>{note.title}</h1>
                <button
                  onClick={() => {
                    updateTitleHandler(note._id);
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="title">
                <p>{note.description}</p>
                <button
                  onClick={() => {
                    updateDescriptionHandler(note._id);
                  }}
                >
                  Edit
                </button>
              </div>
              <button
                onClick={() => {
                  deleteHandler(note._id);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
