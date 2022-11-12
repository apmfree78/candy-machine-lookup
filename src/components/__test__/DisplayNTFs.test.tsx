import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayNFTs from "../DisplayNFTs";
import { faker } from "@faker-js/faker";

const users = [
  {
    age: 36,
    gender: faker.name.sex(),
    name: faker.name.fullName(),
    picture: faker.image.abstract(),
  },
  {
    age: 36,
    gender: faker.name.sex(),
    name: faker.name.fullName(),
    picture: faker.image.abstract(),
  },
  {
    age: 36,
    gender: faker.name.sex(),
    name: faker.name.fullName(),
    picture: faker.image.abstract(),
  },
  {
    age: 36,
    gender: faker.name.sex(),
    name: faker.name.fullName(),
    picture: faker.image.abstract(),
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
