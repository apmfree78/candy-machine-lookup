import { render, screen } from "@testing-library/react";
import NftCard from "../NftCard";
import { faker } from "@faker-js/faker";

const user = {
  age: 36,
  gender: faker.name.sex(),
  name: faker.name.fullName(),
  picture: faker.image.abstract(),
};

jest.mock("axios", () => () => null);
test("user image appears", () => {
  render(<NftCard name={user.name} url={user.picture} />);
  const Image = screen.getByAltText("nft");
  expect(Image).toHaveAttribute("src", user.picture);
});

test("user name appears", () => {
  render(<NftCard name={user.name} url={user.picture} />);
  const Element = screen.getByText(user.name);
  expect(Element).toBeInTheDocument();
});
