import { useRef, useState } from "react";
import "./App.css";
import { useTodo } from "./Context";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { BsPlus } from "react-icons/bs";

function App() {
  const { todo, clearList, addTodo, editTodo, deleteTodo } = useTodo();

  const input = useRef();
  const [edit, setEdit] = useState({
    edit: false,
    id: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = input.current.value.trim();

    if (text) {
      if (edit.edit) {
        editTodo(text, edit.id);
        setEdit({
          edit: false,
          id: "",
        });
      } else {
        addTodo(text);
      }
    }
    input.current.value = "";
    input.current.focus();
  };

  return (
    <>
      <div className="min-h-screen w-screen flex justify-center items-center bg-blue-95">
        <div className="w-full sm:w-1/2 md:w-1/3 mx-3">
          <h1 className="text-center text-2xl md:text-4xl font-semibold">
            To Do List
          </h1>
          <form onSubmit={handleSubmit}>
            <h2 className="text-center my-4 mb-5">Add Your Notes Here</h2>
            <div className="relative">
              <input
                type="text"
                ref={input}
                placeholder={`Add todo...`}
                className="w-full py-3 px-4 bg-white rounded border-2"
              />

              <button type="submit">
                <BsPlus
                  onSubmit={handleSubmit}
                  className="text-3xl absolute top-2.5 right-3"
                />
              </button>
            </div>
          </form>

          <div className="my-5">
            {todo.reverse().map((t) => {
              return (
                <div
                  key={t.id}
                  className="w-full rounded bg-violet-700 py-3 px-4 text-white font-semibold flex justify-between items-center my-3"
                >
                  <p>{t.text}</p>
                  <div className="flex gap-2 text-xl">
                    <AiFillEdit
                      onClick={() => {
                        setEdit({
                          edit: true,
                          id: t.id,
                        });
                        input.current.value = t.text;
                      }}
                    />
                    <AiFillDelete onClick={() => deleteTodo(t.id)} />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center">
            <button
              className="px-5 py-2 rounded text-white font-bold tracking-widest bg-gradient-to-r from-blue-700 via-sky-500 to-cyan-400"
              onClick={clearList}
            >
              CLEAR LIST
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
