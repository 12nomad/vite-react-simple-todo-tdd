import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Todo from "./Todo";

describe("Todo Test", () => {
  it("should render todo", () => {
    render(<Todo />);

    expect(screen.getByText("Todos:")).toBeInTheDocument();
  });

  it("should not add todo when input is empty", async () => {
    render(<Todo />);

    const addTodoInput = screen.getByTestId("add-todo");
    fireEvent.keyDown(addTodoInput, {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
    });

    expect(screen.getByText("Please add some todos...")).toBeInTheDocument();
  });

  it("should add todo", async () => {
    render(<Todo />);

    const addTodoInput = screen.getByTestId("add-todo");
    userEvent.type(addTodoInput, "new todo {enter}");

    await waitFor(() => {
      const newTodo = screen.getByText(". new todo");
      expect(newTodo).toBeInTheDocument();
      expect(newTodo.parentElement).toHaveAttribute("data-isactive", "true");
    });
  });

  it("should toggle todo active state when clicked", async () => {
    render(<Todo />);

    const addTodoInput = screen.getByTestId("add-todo");
    userEvent.type(addTodoInput, "new todo {enter}");

    await waitFor(() => {
      const newTodo = screen.getByText(". new todo");

      fireEvent.click(newTodo);
      expect(newTodo.parentElement).toHaveAttribute("data-isactive", "false");

      fireEvent.click(newTodo);
      expect(newTodo.parentElement).toHaveAttribute("data-isactive", "true");
    });
  });

  it("should delete todo when delete button was clicked", async () => {
    render(<Todo />);

    const addTodoInput = screen.getByTestId("add-todo");
    userEvent.type(addTodoInput, "new todo {enter}");

    await waitFor(() => {
      const newTodo = screen.getByText(". new todo");
      expect(newTodo).toBeInTheDocument();

      const deleteButton = screen.getByTestId("delete-button");
      fireEvent.click(deleteButton);

      expect(newTodo).not.toBeInTheDocument();
    });
  });
});
