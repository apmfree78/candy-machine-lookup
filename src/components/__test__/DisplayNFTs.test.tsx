import React from "react";
import { render, screen } from "@testing-library/react";
import DisplayNFTs from "../DisplayNFTs";
import { faker } from "@faker-js/faker";

const nfts = [
  {
    name: faker.name.fullName(),
    url: faker.image.abstract(),
  },
  {
    name: faker.name.fullName(),
    url: faker.image.abstract(),
  },
  {
    name: faker.name.fullName(),
    url: faker.image.abstract(),
  },
  {
    name: faker.name.fullName(),
    url: faker.image.abstract(),
  },
];
jest.mock("axios", () => () => null);
test("container for list of NTFs appears", () => {
  render(<DisplayNFTs nfts={nfts} />);
  const Element = screen.getByRole("list");
  expect(Element).toBeInTheDocument();
});

test("NTF list items appears", () => {
  render(<DisplayNFTs nfts={nfts} />);
  const Element = screen.getAllByRole("listitem");
  expect(Element.length).toEqual(4);
});
