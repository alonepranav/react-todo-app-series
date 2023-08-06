import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const context = createContext();

export const Context = ({ children }) => {
  const [todo, setTodo] = useState(() => {
    const s = JSON.parse(sessionStorage.getItem("context"));

    return s || [];
  });
  const clearList = () => {
    setTodo([]);
    sessionStorage.setItem("context", JSON.stringify([]));
  };

  const getRandomId = () => {
    const text = "1234567890qwertyuiopasdfghjklzxcvbnm";
    let tex = "";
    for (let i = 0; i < 13; i++) {
      tex += text[Math.floor((Math.random() * 100) % text.length)];
    }
    return tex;
  };

  const addTodo = (text) => {
    const temp = [...todo, { text, id: getRandomId() }];
    sessionStorage.setItem("context", JSON.stringify([...temp]));
    setTodo([...temp]);
  };

  const deleteTodo = (id) => {
    const temp = todo.filter((t) => {
      return t.id !== id;
    });

    sessionStorage.setItem("context", JSON.stringify([...temp]));
    setTodo([...temp]);
  };

  const editTodo = (text, id) => {
    const temp = [...todo];
    const item = temp.find((t) => t.id === id);
    const index = temp.indexOf(item);

    temp[index] = { text, id };

    const tem = [...temp];
    sessionStorage.setItem("context", JSON.stringify([...tem]));
    setTodo([...temp]);
  };

  return (
    <context.Provider
      value={{ todo, clearList, addTodo, editTodo, deleteTodo }}
    >
      {children}
    </context.Provider>
  );
};

export const useTodo = () => {
  return useContext(context);
};
