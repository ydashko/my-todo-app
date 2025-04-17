import { useEffect, useState } from 'react';
import axios from 'axios';

type Todo = {
  id: number;
  title: string;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => setTodos(res.data));
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    const res = await axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: newTodo,
      completed: false,
    });
    setTodos((prev) => [...prev, { id: res.data.id, title: newTodo }]);
    setNewTodo('');
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-xl mx-auto bg-white shadow-md p-6 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Todo App</h1>
        <div className="flex gap-2 mb-4">
          <input
            className="flex-1 border px-2 py-1 rounded"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 cursor-pointer"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center border-b pb-1"
            >
              <span>{todo.title}</span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
