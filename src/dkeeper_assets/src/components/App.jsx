import React, { useEffect, useState } from "react";
import CreateArea from "./CreateArea";
import Footer from "./Footer";
import Header from "./Header";
import Note from "./Note";
import { dkeeper } from "../../../declarations/dkeeper";

const App = () => {
  const [notes, setNotes] = useState([]);
  const addNote = (newNote) => {
    setNotes((prev) => {
      dkeeper.createNote(newNote.title, newNote.content);
      return [newNote, ...prev];
    });
  };
  useEffect(() => {
    console.log("useEffect is triggered!");
    fetchData();
  }, []);

  const fetchData = async () => {
    const notesArray = await dkeeper.readNotes();
    setNotes(notesArray);
  };

  const deleteNote = (id) => {
    dkeeper.removeNote(id);
    setNotes((prev) => {
      return prev.filter((item, index) => {
        return id !== index;
      });
    });
  };

  return (
    <div className="App">
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="noteHolder">
        {notes.map((note, index) => (
          <Note
            key={index}
            id={index}
            title={note.title}
            content={note.content}
            onDelete={deleteNote}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
