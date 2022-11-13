import { PublicKey } from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";
import {
  getMintAddresses,
  getCandyMachineCreator,
  fetchNft,
} from "../web3/candyMachineV2";
import { useState } from "react";

interface SearchBarProps {
  setMintAddresses: (addresses: string[]) => void;
  connection: Connection;
}

// search bar for user to input Candy Machine they would like to search for
const SearchBar: React.FC<SearchBarProps> = ({
  setMintAddresses,
  connection,
}) => {
  const [address, setAddress] = useState("");

  // update current input to state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ///update state
    setAddress(e.target.value);
  };

  const handleSubmit = async () => {
    //first validate address is a valid solana address
    const validator = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    const isValid = validator.test(address);

    // if valid set address
    if (isValid) {
      const nft = await fetchNft(connection, address);
      console.log(`${nft.name} ${nft.json?.image}`);
      // transfor address to PublicKey object
      // const candyMachineId = new PublicKey(address);

      // // extract list of candoMachine Creators using candyMachineId
      // const candyMachineCreator = await getCandyMachineCreator(candyMachineId);

      // // finally, get mint addresses using first creator
      // const mintAddresses = await getMintAddresses(
      //   candyMachineCreator[0],
      //   connection
      // );
      // console.log(mintAddresses);
      // //setting state
      // setMintAddresses([...mintAddresses]);
    } else alert("Invalid address submitted, please try again!");
  };

  return (
    <div
      className="field has-addons"
      style={{
        display: "flex",
        justifyContent: "center",
        paddingBottom: "3vh",
      }}
    >
      <div className="control">
        <input
          className="input is-large"
          type="text"
          value={address}
          placeholder="Find Candy Machine"
          onChange={handleChange}
        />
      </div>
      <div className="control">
        <button
          className="button is-info is-large"
          disabled={address === ""}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
