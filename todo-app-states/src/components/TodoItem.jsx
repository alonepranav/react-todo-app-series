import React from "react";
import { BiTrash, BiCheckSquare } from "react-icons/bi";

export default function TodoItem({
  text,
  id,
  isComplete,
  deleteTodo,
  setComplete,
}) {
  return (
    <div className="todo">
      <p className={`${isComplete}`}>{text}</p>
      <div className="icons">
        <BiCheckSquare className="icon" onClick={() => setComplete(id)} />
        <BiTrash className="icon" onClick={() => deleteTodo(id)} />
      </div>
    </div>
  );
}
