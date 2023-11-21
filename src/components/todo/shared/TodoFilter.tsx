import { ChangeEvent } from "react";

import { TFilter } from "../types/TFilter";

interface ITodoFilter {
  filterTodos: (filter: TFilter) => void;
}

const TodoFilter = ({ filterTodos }: ITodoFilter) => {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) =>
    filterTodos(e.target.value as TFilter);

  return (
    <div className="flex items-baseline gap-2">
      <label
        htmlFor="choice"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Filter By
      </label>
      <select
        id="choice"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 focus:outline-blue-500 block p-1.5 cursor-pointer"
        onChange={onChange}
        data-testid="select-filter"
      >
        <option defaultValue="all" value="all">
          all todos
        </option>
        <option value="completed">completed</option>
        <option value="active">active</option>
      </select>
    </div>
  );
};

export default TodoFilter;
