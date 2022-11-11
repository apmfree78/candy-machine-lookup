import React from "react";
import { render, screen } from "@testing-library/react";
import MintInfo from "./MintInfo";

test("Mint Price Column Appears", () => {
  render(<MintInfo />);
  const Element = screen.getByText(/mint price/i);
  expect(Element).toBeInTheDocument();
});

test("Live Date Appears", () => {
  render(<MintInfo />);
  const Element = screen.getByText(/live date/i);
  expect(Element).toBeInTheDocument();
});

test("Mint Stats Column Appears", () => {
  render(<MintInfo />);
  const Element = screen.getByText(/mint stats/i);
  expect(Element).toBeInTheDocument();
});

test("Creators Column Appears", () => {
  render(<MintInfo />);
  const Element = screen.getByText(/creators/i);
  expect(Element).toBeInTheDocument();
});
