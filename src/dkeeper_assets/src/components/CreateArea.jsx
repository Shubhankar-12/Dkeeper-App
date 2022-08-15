import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import Zoom from "@mui/material/Zoom";

const CreateArea = (props) => {
  const [expanded, setExpanded] = useState(false);

  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setNewNote((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitNote = (e) => {
    e.preventDefault();
    props.onAdd(newNote);
    setNewNote({
      title: "",
      content: "",
    });
  };

  const isActive = () => {
    setExpanded(true);
  };

  return (
    <div>
      <form className="create-note">
        {expanded && (
          <input
            name="title"
            placeholder="Title"
            value={newNote.title}
            onChange={changeHandler}
          />
        )}
        <textarea
          name="content"
          placeholder="Take a note..."
          rows={expanded ? "3" : "1"}
          value={newNote.content}
          onClick={isActive}
          onChange={changeHandler}
        />
        <Zoom in={expanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateArea;
