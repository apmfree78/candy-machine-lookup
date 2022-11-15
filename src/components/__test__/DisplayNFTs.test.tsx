import { clusterApiUrl, Connection } from "@solana/web3.js";
import { render, screen } from "@testing-library/react";
import DisplayNFTs from "../DisplayNFTs";
import { faker } from "@faker-js/faker";

const mintAddresses = [
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
];
// jest.mock('axios', () => () => null);
test("container for list of NTFs appears", () => {
  const connection = new Connection(clusterApiUrl("testnet"));
  render(<DisplayNFTs connection={connection} mintAddresses={mintAddresses} />);
  const Element = screen.getByRole("list");
  expect(Element).toBeInTheDocument();
});

// test.skip("NTF list items appears", () => {
//   const connection = new Connection(clusterApiUrl("testnet"));
//   render(<DisplayNFTs connection={connection} mintAddresses={mintAddresses} />);
//   const Element = screen.getAllByRole("listitem");
//   expect(Element.length).toEqual(4);
// });
