"use client";
import { useEffect, useState } from "react";

type Todo = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URI!;

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/todo`);
      const data = await res.json();
      setTodos(data.todos || data); // support both formats
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const addTodo = async () => {
    if (!newTodo.trim()) return;

    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTodo, description: "description" }),
      });

      if (res.ok) {
        setNewTodo("");
        fetchTodos();
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await fetch(`${BACKEND_URL}/api/v1/todo/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const updateTodo = async (id: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/v1/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editedTitle }),
      });

      console.log("resssssssssssssssssssssssssssssssss", res);
      if (res.ok) {
        setEditingId(null);
        fetchTodos();
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const toggleComplete = async (id: string, completed: boolean) => {
    try {
      await fetch(`${BACKEND_URL}/api/v1/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Toggle complete error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 mt-4">📝 TODO App</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border p-2 rounded w-64"
          placeholder="Enter a new todo"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md">
        {todos.length > 0 ? todos?.map((todo) => (
          <li
            key={todo._id}
            className={`bg-white p-4 rounded shadow mb-4 flex justify-between items-center ${todo.completed ? "bg-green-50" : ""
              }`}
          >
            <div className="flex items-center gap-3 w-full">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo._id, todo.completed)}
                className="h-5 w-5 accent-green-500"
              />
              {editingId === todo._id ? (
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                  className="border p-1 rounded w-full"
                />
              ) : (
                <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                  {todo.title}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              {editingId === todo._id ? (
                <>
                  <button
                    onClick={() => updateTodo(todo._id)}
                    className="text-green-600 hover:text-green-800"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditingId(todo._id);
                      setEditedTitle(todo.title);
                    }}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </li>
        )) : "Add a  New TODO :)"}
      </ul>

    </div>
  );
}
