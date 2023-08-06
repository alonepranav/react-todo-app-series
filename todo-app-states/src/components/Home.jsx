import React, { useEffect, useState } from "react";
import "../styles/home.css";
import TodoItem from "./TodoItem";

export default function Home() {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  const getRandomId = () => {
    const str = "abcdefghijklmnopqrstuvwxyz";
    let id = "";
    for (let i = 0; i < 7; i++)
      id += str[Math.floor((Math.random() * 100) % str.length)];
    return id;
  };

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem("todo"));
    if (storage === null) setData([]);
    else setData(storage);
  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    if (!input) return;

    const newTodo = {
      id: getRandomId(),
      isComplete: false,
      text: input,
    };

    localStorage.setItem("todo", JSON.stringify([...data, { ...newTodo }]));
    setInput("");
    setData([...data, { ...newTodo }]);
  };

  const setComplete = (id) => {
    const temp = [...data];
    const item = data.find((t) => t.id === id);
    const index = data.indexOf(item);
    temp[index].isComplete = !temp[index].isComplete;
    setData(temp);
    localStorage.setItem("todo", JSON.stringify(temp));
  };

  const deleteTodo = (id) => {
    const temp = data.filter((t) => t.id !== id);
    localStorage.setItem("todo", JSON.stringify(temp));
    setData(temp);
  };

  return (
    <div className="home">
      <div className="container">
        <h1>Todo App</h1>
        <br />
        <br />
        <form onSubmit={addTodo}>
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
            <h3 style={{ marginTop: "10px" }}>Plan your todo today !</h3>
          ) : (
            data.map((t) => (
              <TodoItem key={t.id} {...{ ...t, deleteTodo, setComplete }} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
