import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import SearchBar from "../SearchBar";

test("input field appears", () => {
  const getCandyMachineData = jest.fn();
  render(
    <SearchBar getCandyMachineData={getCandyMachineData} loading={false} />
  );
  const input = screen.getByRole("textbox");
  expect(input).toBeInTheDocument();
});

test("button appears", () => {
  const getCandyMachineData = jest.fn();
  render(
    <SearchBar getCandyMachineData={getCandyMachineData} loading={false} />
  );
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeInTheDocument();
});

test("button is disabled when there is no input", () => {
  const getCandyMachineData = jest.fn();
  render(
    <SearchBar getCandyMachineData={getCandyMachineData} loading={false} />
  );
  const button = screen.getByRole("button", { name: /search/i });
  expect(button).toBeDisabled();
});

test("button is enabled when there is user input", async () => {
  const getCandyMachineData = jest.fn();
  render(
    <SearchBar getCandyMachineData={getCandyMachineData} loading={false} />
  );
  const button = screen.getByRole("button", { name: /search/i });
  const input = screen.getByRole("textbox");
  user.type(input, "a");
  expect(button).toBeEnabled();
});
