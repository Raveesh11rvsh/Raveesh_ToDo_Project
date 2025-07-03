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
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-blue-100 to-emerald-100 p-6">
      <div className="max-w-2xl mx-auto mt-10 bg-white/60 backdrop-blur-xl shadow-xl rounded-3xl p-8 border border-white/20">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-900 drop-shadow-md">
          🌟 My Todo List
        </h1>

        <div className="flex gap-2 mb-4">
          <Input
            placeholder="What's on your mind today?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 shadow-inner focus:ring-2 focus:ring-indigo-300"
          />
          <Button onClick={addTodo} className="gap-1 bg-indigo-600 hover:bg-indigo-700 text-white">
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
              className={`rounded-full px-4 ${filter === f ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50'}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-600 italic">No tasks found 💤</p>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className={`transition-all duration-300 flex items-center justify-between px-4 py-3 rounded-2xl shadow-md ${
                todo.completed ? "bg-green-100 border border-green-300" : "bg-white border border-gray-200"
              }`}
            >
              <Card className="w-full bg-transparent shadow-none">
                <CardContent className="flex items-center justify-between p-0">
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={todo.completed}
                      onChange={() => toggleComplete(todo.id)}
                      className="scale-125 accent-green-600"
                    />
                    <span
                      className={`text-lg ${
                        todo.completed ? "line-through text-gray-500" : "text-gray-800"
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
                      className="hover:bg-blue-100"
                    >
                      <Edit3 className="w-5 h-5 text-blue-600" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => deleteTodo(todo.id)}
                      className="hover:bg-red-100"
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

