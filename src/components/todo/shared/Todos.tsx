import { ITodo } from "../types/ITodo";

interface ITodos {
  todos: ITodo[];
  onToggleActiveTodo: (todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}

const Todos = ({ todos, onToggleActiveTodo, onDeleteTodo }: ITodos) => {
  return (
    <ul className="mt-4 mx-4 space-y-4" data-testid="todos-list">
      {todos.length > 0 ? (
        todos.map((todo) => (
          <li
            data-isactive={todo.isActive}
            data-testid="todo-item"
            onClick={() => onToggleActiveTodo(todo.id)}
            key={todo.id}
            className="relative flex justify-between w-full items-center"
          >
            <span
              className={`cursor-pointer ${
                !todo.isActive ? "line-through" : ""
              }`}
            >
              . {todo.content}
            </span>

            <svg
              className="w-4 h-4 text-red-600 cursor-pointer"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
              data-testid="delete-button"
              onClick={() => onDeleteTodo(todo.id)}
            >
              <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
            </svg>

            <span className="absolute block -bottom-1 w-full h-[1px] bg-slate-100 rounded-full"></span>
          </li>
        ))
      ) : (
        <li>Please add some todos...</li>
      )}
    </ul>
  );
};

export default Todos;
