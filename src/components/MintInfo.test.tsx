import React from "react";
import { render, screen } from "@testing-library/react";
import MintInfo from "./MintInfo";

jest.mock("axios", () => () => null);
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

test("Items Avaliable row appears", () => {
  render(<MintInfo />);
  const Element = screen.getByRole("cell", {
    name: /items avaliable/i,
  });
  expect(Element).toBeInTheDocument();
});

test("Items Redeemed row appears", () => {
  render(<MintInfo />);
  const Element = screen.getByRole("cell", {
    name: /items redeemed/i,
  });
  expect(Element).toBeInTheDocument();
});

test("Items Remaining row appears", () => {
  render(<MintInfo />);
  const Element = screen.getByRole("cell", {
    name: /items remaining/i,
  });
  expect(Element).toBeInTheDocument();
});

test("Items Royalties row appears", () => {
  render(<MintInfo />);
  const Element = screen.getByRole("cell", {
    name: /royalties/i,
  });
  expect(Element).toBeInTheDocument();
});

test("Creators Column Appears", () => {
  render(<MintInfo />);
  const Element = screen.getByText(/creators/i);
  expect(Element).toBeInTheDocument();
});
