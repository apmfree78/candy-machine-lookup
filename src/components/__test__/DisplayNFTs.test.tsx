import { clusterApiUrl, Connection } from "@solana/web3.js";
import { render, screen } from "@testing-library/react";
import DisplayNFTs from "../DisplayNFTs";
import { faker } from "@faker-js/faker";

jest.mock("../../web3/candyMachineV2", () => ({
  fetchNfts: () => {
    return [
      {
        name: "nft 1",
        url: "https://dev.blockchain.quantelica.com/RevealPics/94.png",
      },
      {
        name: "nft 2",
        url: "https://dev.blockchain.quantelica.com/RevealPics/94.png",
      },
      {
        name: "nft 3",
        url: "https://dev.blockchain.quantelica.com/RevealPics/94.png",
      },
      {
        name: "nft 4",
        url: "https://dev.blockchain.quantelica.com/RevealPics/94.png",
      },
    ];
  },
}));
const mintAddresses = [
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
  faker.datatype.hexadecimal({ length: 40 }),
];
// jest.mock('axios', () => () => null);
test("container for list of NTFs appears", () => {
  const connection = new Connection(clusterApiUrl("testnet"));
  // const getNftByPage = jest.fn();
  render(<DisplayNFTs connection={connection} mintAddresses={mintAddresses} />);
  const Element = screen.getByRole("list");
  expect(Element).toBeInTheDocument();
});
test.skip("NTF list items appears", () => {
  const connection = new Connection(clusterApiUrl("testnet"));
  // const getNftByPage = jest.fn();
  render(<DisplayNFTs connection={connection} mintAddresses={mintAddresses} />);
  const Element = screen.getAllByRole("listitem");
  expect(Element.length).toEqual(4);
});
