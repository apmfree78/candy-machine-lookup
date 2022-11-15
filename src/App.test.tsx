import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => () => null);
test("renders App headline", () => {
  render(<App />);
  const linkElement = screen.getByRole("heading");
  expect(linkElement).toBeInTheDocument();
});
