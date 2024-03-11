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

  function toggleClick(index: number) {
    const updatedTodos = todos.map((todo) =>
      todo.id === index ? { ...todo, isChecked: !todo.isChecked } : todo
    );
    setTodos(updatedTodos);
  }

  const completedTodo = todos.filter((todo) => todo.isChecked === true);

  const inCompletedTodo = todos.filter((todo) => todo.isChecked === false);

  return (
    <div className="flex flex-col justify-center items-center">
      <form onSubmit={handleSubmit}>
        <input
          className="w-96 p-4 border-2 mt-8"
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
      <div className="flex gap-20">
        <div className="w-3/6">
          <h1>未完了</h1>
          {inCompletedTodo.map((todo) => (
            <div
              key={todo.id}
              className="mt-4 flex items-center border-2 w-64 h-16 justify-between px-4 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => toggleClick(todo.id)}
                />
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
        <div className="w-3/6">
          <div className="flex items-center justify-between">
            <h1>完了済み</h1>
            <button
              className="bg-sky-400 text-white p-2 rounded"
              onClick={() =>
                setTodos(todos.filter((alltodo) => alltodo.isChecked === false))
              }
            >
              一括削除
            </button>
          </div>
          {completedTodo.map((todo) => (
            <div
              key={todo.id}
              className="mt-4 flex items-center border-2 w-64 h-16 justify-between px-4 rounded"
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.isChecked}
                  onChange={() => toggleClick(todo.id)}
                />
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
      </div>
    </div>
  );
}
