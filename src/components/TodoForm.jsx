import React, { useState } from "react";
import { useTodo } from "../Context";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex items-center gap-2 bg-white/20 rounded-lg px-3 py-2 shadow-md"
    >
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full max-h-96 border border-transparent focus:border-blue-500 rounded-lg px-2 py-1 bg-gray-100 text-black outline-none placeholder-gray-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-lg px-4 py-2 
         hover:bg-gray-200 text-black shadow-sm" id="addBtn"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
