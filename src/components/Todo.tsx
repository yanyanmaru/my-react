import { useState } from "react";

type Todo = {
  id: number;
  title: string;
  isChecked: boolean;
};

export default function Todo() {
  const [text, setText] = useState("fafafa");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodos([...todos, { id: Date.now(), title: text, isChecked: false }]);
    setText("");
  };

  function toggleClick(index:number) {
    const updatedTodos = todos.map((todo) =>
      todo.id === index ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="w-96 p-4 border-2"
          type="text"
          value={text}
          onChange={handleChange}
        />
        <input
          className="bg-sky-400 text-white p-2 rounded"
          onSubmit={handleSubmit}
          type="submit"
          value="追加"
        />
      </form>
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="mt-4 flex items-center border-2 w-96 h-24 justify-between px-4 rounded"
        >
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={todo.isChecked} onChange={() => toggleClick(todo.id)} />
            <p className="text-lg">{todo.title}</p>
          </div>
          {todo.isChecked && (
            <button
              onClick={() =>
                setTodos(todos.filter((notodo) => notodo.id !== todo.id))
              }
              className="bg-sky-400 text-white p-2 rounded"
            >
              削除
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
