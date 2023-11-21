import {
  render,
  screen,
  waitFor,
  fireEvent,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Todo from "./Todo";
import { ITodo } from "./types/ITodo";

const mockTodos: ITodo[] = [
  {
    id: "1",
    content: "learn react tdd",
    isActive: false,
  },
  {
    id: "2",
    content: "learn nextjs",
    isActive: true,
  },
  {
    id: "3",
    content: "learn JAVA",
    isActive: true,
  },
];

describe("Todo Test", () => {
  it("should render todo", () => {
    render(<Todo />);

    expect(screen.getByText("Todos:")).toBeInTheDocument();
  });

  describe("Todo Actions", () => {
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

  describe("Todos Filter", () => {
    it("should render a list of todos if some intial todos are provided", () => {
      render(<Todo initialTodos={mockTodos} />);

      expect(screen.getAllByTestId("todo-item").length).toEqual(
        mockTodos.length
      );
    });

    it("should render completed todos when completed filter is selected", async () => {
      render(<Todo initialTodos={mockTodos} />);

      expect(
        (screen.getByRole("option", { name: "all todos" }) as HTMLOptionElement)
          .selected
      ).toBeTruthy();

      await userEvent.selectOptions(
        screen.getByTestId("select-filter"),
        "completed"
      );

      expect(
        (screen.getByRole("option", { name: "completed" }) as HTMLOptionElement)
          .selected
      ).toBeTruthy();
      expect(screen.getAllByTestId("todo-item").length).toEqual(1);
    });

    it("should render active todos when active filter is selected", async () => {
      render(<Todo initialTodos={mockTodos} />);

      expect(
        (screen.getByRole("option", { name: "all todos" }) as HTMLOptionElement)
          .selected
      ).toBeTruthy();

      await userEvent.selectOptions(
        screen.getByTestId("select-filter"),
        "active"
      );

      expect(
        (screen.getByRole("option", { name: "active" }) as HTMLOptionElement)
          .selected
      ).toBeTruthy();
      expect(screen.getAllByTestId("todo-item").length).toEqual(2);
    });
  });

  describe("Todos Count", () => {
    it("should render correct todos count", async () => {
      render(<Todo initialTodos={mockTodos} />);

      expect(
        within(screen.getByTestId("count-all")).getByText("3")
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId("count-completed")).getByText("1")
      ).toBeInTheDocument();
      expect(
        within(screen.getByTestId("count-active")).getByText("2")
      ).toBeInTheDocument();
    });
  });
});
