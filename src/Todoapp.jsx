import { useState } from "react";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { Edit3, Plus, Trash2 } from "lucide-react";
import { Card } from "./components/Card";
import { CardContent } from "./components/CardContent";

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [editId, setEditId] = useState(null);
  const [filter, setFilter] = useState("all");

  const addTodo = () => {
    if (!input.trim()) return;
    if (editId !== null) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text: input } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: input,
          completed: false,
        },
      ]);
    }
    setInput("");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id) => {
    const target = todos.find((todo) => todo.id === id);
    setInput(target.text);
    setEditId(id);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-100 to-indigo-100 p-4">
      <div className="max-w-xl mx-auto mt-10">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-800">
          Creative Todo App
        </h1>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Add or edit a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow"
          />
          <Button onClick={addTodo} className="gap-1">
            <Plus className="w-4 h-4" />
            {editId !== null ? "Update" : "Add"}
          </Button>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          {['all', 'active', 'completed'].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-600">No tasks to show</p>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`transition-all duration-300 flex items-center justify-between px-4 py-3 shadow-md ${
                todo.completed ? "bg-green-50" : "bg-white"
              }`}
            >
              <Card className="w-full">
                <CardContent className="flex items-center justify-between p-0">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="scale-125"
                    />
                    <span
                      className={`text-lg ${
                        todo.completed ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {todo.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => editTodo(todo.id)}
                    >
                      <Edit3 className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
