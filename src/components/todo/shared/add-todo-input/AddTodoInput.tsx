import { KeyboardEvent as ReactKeyboardEvent, ChangeEvent } from "react";
import useAddTodoInput from "./hooks/useAddTodoInput";

interface AddTodoInput {
  onAddTodo: (content: string) => void;
}

const AddTodoInput = ({ onAddTodo }: AddTodoInput) => {
  const { content, setContent, inputRef } = useAddTodoInput();

  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const onAddNote = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && content.trim() !== "") {
      e.preventDefault();
      onAddTodo(content.trim());
      setContent("");
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-500 "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        data-testid="add-todo"
        placeholder="add new todo (ctrl + y)"
        className="block w-full mt-8 pl-10 p-2 bg-slate-50 border border-gray-300 text-slate-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500"
        onChange={onChange}
        onKeyDown={onAddNote}
        value={content}
      />
    </div>
  );
};

export default AddTodoInput;
