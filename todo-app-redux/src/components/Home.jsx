import React, { useState } from "react";
import "../styles/home.css";
import TodoItem from "./TodoItem";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/TodoSlice";

export default function Home() {
  const [input, setInput] = useState("");
  const data = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const getRandomId = () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 7; i++)
      id += str[Math.floor((Math.random() * 100) % str.length)];
    return id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) return;
    dispatch(
      addTodo({
        id: getRandomId(),
        input,
      })
    );
    setInput("");
  };

  return (
    <div className="home">
      <div className="container">
        <h1>Todo App</h1>
        <br />
        <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input"
          />
          <input type="submit" value="Add Todo" className="button" />
        </form>
        <div className="scroll">
          {!data.length ? (
            <h3>Plan your todo today !</h3>
          ) : (
            data.map((todo) => {
              return <TodoItem {...todo} key={todo.id} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}
