import useTodo from "./hooks/useTodo";
import Todos from "./shared/Todos";
import AddTodoInput from "./shared/add-todo-input/AddTodoInput";
import TodoFilter from "./shared/TodoFilter";
import { ITodo } from "./types/ITodo";
import TodoCount from "./shared/TodoCount";

const Todo = ({ initialTodos }: { initialTodos?: ITodo[] }) => {
  const {
    displayTodos,
    addTodo,
    deleteTodo,
    toggleActiveTodo,
    filterTodos,
    count,
  } = useTodo(initialTodos);

  return (
    <div>
      <ul className="w-full flex items-center justify-center gap-8 my-8">
        <TodoCount
          borderColor="border-yellow-400"
          count={count.all}
          dataTestId="count-all"
          title="Total"
        />
        <TodoCount
          borderColor="border-green-400"
          count={count.completed}
          dataTestId="count-completed"
          title="Completed"
        />
        <TodoCount
          borderColor="border-purple-400"
          count={count.active}
          dataTestId="count-active"
          title="Active"
        />
      </ul>

      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-medium">Todos: </h2>

        <TodoFilter filterTodos={filterTodos} />
      </div>

      <Todos
        todos={displayTodos}
        onToggleActiveTodo={toggleActiveTodo}
        onDeleteTodo={deleteTodo}
      />

      <AddTodoInput onAddTodo={addTodo} />
    </div>
  );
};

export default Todo;
