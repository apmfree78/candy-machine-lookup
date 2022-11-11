import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayNFTs from "./DisplayNFTs";

const users = [
  {
    age: 36,
    gender: "male",
    name: "Adam Dumont",
    picture: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    age: 36,
    gender: "male",
    name: "Adam Dumont",
    picture: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    age: 36,
    gender: "male",
    name: "Adam Dumont",
    picture: "https://randomuser.me/api/portraits/men/79.jpg",
  },
  {
    age: 36,
    gender: "male",
    name: "Adam Dumont",
    picture: "https://randomuser.me/api/portraits/men/79.jpg",
  },
];
jest.mock("axios", () => () => null);
test("container for list of NTFs appears", () => {
  render(<DisplayNFTs users={users} />);
  const Element = screen.getByRole("list");
  expect(Element).toBeInTheDocument();
});

test("NTF list items appears", () => {
  render(<DisplayNFTs users={users} />);
  const Element = screen.getAllByRole("listitem");
  expect(Element.length).toEqual(4);
});
