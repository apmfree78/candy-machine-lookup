import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("axios", () => () => null);
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByRole("container");
  expect(linkElement).toBeInTheDocument();
});
