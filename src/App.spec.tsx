import { render, screen } from "@testing-library/react";
import App from "./App";

describe.skip("App Test", () => {
  it("should work with jest", () => {
    expect(0).toEqual(0);
  });

  it("should work with RTL", () => {
    render(<App />);
    screen.debug();
  });

  it("should work with jest & RTL", () => {
    render(<App />);
    expect(screen.getByText("Simple To-Do TDD")).toBeInTheDocument();
  });
});
