import { createSlice } from "@reduxjs/toolkit";

const initialState = () => {
  const storage = JSON.parse(sessionStorage.getItem("todo"));
  if (storage === null) return [];
  else return storage;
};

const todoSlice = createSlice({
  name: "todo",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      sessionStorage.setItem(
        "todo",
        JSON.stringify([
          ...state,
          {
            id: action.payload.id,
            isComplete: false,
            text: action.payload.input,
          },
        ])
      );
      return [
        ...state,
        {
          id: action.payload.id,
          isComplete: false,
          text: action.payload.input,
        },
      ];
    },

    deleteTodo: (state, action) => {
      let temp = [...state];
      temp = temp.filter((t) => t.id !== action.payload.id);
      sessionStorage.setItem("todo", JSON.stringify([...temp]));
      return [...temp];
    },

    setComplete: (state, action) => {
      const id = action.payload.id;
      const item = state.find((t) => t.id === id);
      const index = state.indexOf(item);
      state[index].isComplete = !state[index].isComplete;
      sessionStorage.setItem("todo", JSON.stringify([...state]));
      return state;
    },
  },
});

export const { deleteTodo, addTodo, setComplete } = todoSlice.actions;

export default todoSlice.reducer;
