import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBar from "../SearchBar";

test("input field appears", () => {
  const setMintAddresses = jest.fn();
  render(<SearchBar setMintAddresses={setMintAddresses} />);
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("button appears", () => {
  const setMintAddresses = jest.fn();
  render(<SearchBar setMintAddresses={setMintAddresses} />);
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeInTheDocument();
});

test("button is disabled when there is no input", () => {
  const setMintAddresses = jest.fn();
  render(<SearchBar setMintAddresses={setMintAddresses} />);
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeDisabled();
});

test("button is enabled when there is user input", async () => {
  const setMintAddresses = jest.fn();
  render(<SearchBar setMintAddresses={setMintAddresses} />);
  const button = screen.getByRole("button", { name: /search/i });
  const input = screen.getByRole("textbox");
  await user.type(input, "a");
  expect(button).toBeEnabled();
});
