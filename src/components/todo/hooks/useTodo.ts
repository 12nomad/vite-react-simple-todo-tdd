import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { ITodo } from "../types/ITodo";

const useTodo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

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

  return { todos, addTodo, toggleActiveTodo, deleteTodo };
};

export default useTodo;
