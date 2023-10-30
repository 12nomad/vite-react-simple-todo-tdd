import Todos from "./shared/Todos";
import AddTodoInput from "./shared/AddTodoInput";
import useTodo from "./hooks/useTodo";

const Todo = () => {
  const { todos, addTodo, deleteTodo, toggleActiveTodo } = useTodo();

  return (
    <div>
      <h2 className="text-lg font-medium">Todos: </h2>

      <Todos
        todos={todos}
        onToggleActiveTodo={toggleActiveTodo}
        onDeleteTodo={deleteTodo}
      />

      <AddTodoInput onAddTodo={addTodo} />
    </div>
  );
};

export default Todo;
