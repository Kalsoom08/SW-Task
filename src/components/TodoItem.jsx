import React, { useState } from "react";
import { useTodo } from "../Context";
import { AiFillEdit, AiOutlineSave, AiOutlineDelete } from "react-icons/ai";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div id="items"
      className={`flex items-center justify-between border bg-purple-900 border-gray-300 rounded-lg px-4 py-2 gap-x-4 shadow-sm transition-all duration-300  text-white animate-fade-in ${
        todo.completed ? "bg-blue-200 text-gray-800" : "bg-purple-200 "
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer accent-blue-500"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`w-full border-none outline-none bg-transparent rounded-lg ${
          isTodoEditable ? "px-2 bg-white/50 text-gray-900" : "text-inherit"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      <div className="flex items-center gap-2">
        <button
          className={`p-2 rounded-lg text-lg text-black bg-purple-300 ${
            todo.completed ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          onClick={() => {
            if (todo.completed) return;

            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.completed}
        >
          {isTodoEditable ? <AiOutlineSave /> : <AiFillEdit />}
        </button>
        <button
          className="p-2 rounded-lg text-black
           text-lg bg-purple-300 hover:bg-gray-200"
          onClick={() => deleteTodo(todo.id)}
        >
          <AiOutlineDelete />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
