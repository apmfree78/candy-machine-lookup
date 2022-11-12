import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBar from "../SearchBar";

test("input field appears", () => {
  const setCandyAddress = jest.fn();
  render(<SearchBar setCandyAddress={setCandyAddress} />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("button appears", () => {
  const setCandyAddress = jest.fn();
  render(<SearchBar setCandyAddress={setCandyAddress} />);
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeInTheDocument();
});

test("button is disabled when there is no input", () => {
  const setCandyAddress = jest.fn();
  render(<SearchBar setCandyAddress={setCandyAddress} />);
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeDisabled();
});

test("button is enabled when there is user input", async () => {
  const setCandyAddress = jest.fn();
  render(<SearchBar setCandyAddress={setCandyAddress} />);
  const button = screen.getByRole("button", { name: /search/i });
  const input = screen.getByRole("textbox");
  await user.type(input, "a");
  expect(button).toBeEnabled();
});
