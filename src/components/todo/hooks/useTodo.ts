import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITodo } from "../types/ITodo";
import { TFilter } from "../types/TFilter";

const useTodo = (initialTodos: ITodo[] | undefined) => {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos || []);
  const [filter, setFilter] = useState<TFilter>("all");
  const [displayTodos, setDisplayTodos] = useState<ITodo[]>([]);
  const [count, setCount] = useState<{
    all: number;
    completed: number;
    active: number;
  }>({ active: 0, all: 0, completed: 0 });

  useEffect(() => {
    setCount({
      all: todos.length,
      active: todos.filter((todo) => todo.isActive).length,
      completed: todos.filter((todo) => !todo.isActive).length,
    });
  }, [todos]);

  useEffect(() => {
    switch (filter) {
      case "all":
        setDisplayTodos(todos);
        break;
      case "active":
        setDisplayTodos(todos.filter((todo) => todo.isActive));
        break;
      case "completed":
        setDisplayTodos(todos.filter((todo) => !todo.isActive));
        break;
      default:
        return console.error("Unsupported Filter: ", filter);
    }
  }, [filter, todos]);

  const addTodo = (content: string) =>
    setTodos((prev) => [{ id: uuidv4(), content, isActive: true }, ...prev]);

  const toggleActiveTodo = (todoId: string) =>
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === todoId ? { ...todo, isActive: !todo.isActive } : todo
      )
    );

  const deleteTodo = (todoId: string) =>
    setTodos((prev) => prev.filter((todo) => todo.id !== todoId));

  const filterTodos = (filter: TFilter) => {
    setFilter(filter);
  };

  return {
    displayTodos,
    addTodo,
    toggleActiveTodo,
    deleteTodo,
    filterTodos,
    count,
  };
};

export default useTodo;
