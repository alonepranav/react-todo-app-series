import React from "react";
import { BiTrash, BiCheckSquare } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { deleteTodo, setComplete } from "../redux/TodoSlice";

export default function TodoItem({ id, text, isComplete }) {
  const dispatch = useDispatch();

  return (
    <div className="todo">
      <p className={`${isComplete}`}>{text}</p>
      <div className="icons">
        <BiCheckSquare
          className="icon"
          onClick={() => dispatch(setComplete({ id }))}
        />
        <BiTrash
          className="icon"
          onClick={() => dispatch(deleteTodo({ id }))}
        />
      </div>
    </div>
  );
}
