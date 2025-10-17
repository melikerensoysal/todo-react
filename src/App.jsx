import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./style.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All"); // "All", "Active", "Completed"

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)));
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.text.toLowerCase().includes(search.toLowerCase())
    )
    .filter((todo) => {
      if (filter === "All") return true;
      if (filter === "Active") return !todo.completed;
      if (filter === "Completed") return todo.completed;
      return true;
    });

  return (
    <div className="app">
      <h1>Todo App</h1>
      <input
        type="text"
        placeholder="Search todos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search"
      />

      <TodoForm addTodo={addTodo} />

      <div className="filters">
        <button
          onClick={() => setFilter("All")}
          className={filter === "All" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("Active")}
          className={filter === "Active" ? "active" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("Completed")}
          className={filter === "Completed" ? "active" : ""}
        >
          Completed
        </button>
      </div>

      <TodoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  );
}

export default App;
