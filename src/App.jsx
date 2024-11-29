import React, { useState, useEffect } from "react";
import "./App.css";
import { TodoProvider } from "./Context";
import { TodoForm, TodoItem } from "./components";
function App() {
  const [todos, setTodos] = useState([]);

  // Functionalities
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // Local Storage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-purple-400 to-gray-900  py-8 text-white" id="main-Div">
        <div className="w-full max-w-2xl mx-auto shadow-lg rounded-lg px-6 py-5 bg-white/10">
          <h1 className="text-3xl font-bold text-center mb-4 text-white tracking-wide">
           Manage Your Day
          </h1>
          <div className="mb-4">
            <TodoForm />
          </div>
          <div
            className="flex flex-col space-y-4 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
          >
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
