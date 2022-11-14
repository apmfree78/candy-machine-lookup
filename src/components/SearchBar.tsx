import { PublicKey } from "@metaplex-foundation/js";
import { useState } from "react";

interface SearchBarProps {
  getCandyMachineData: (candyMachineId: PublicKey) => void;
}

// search bar for user to input Candy Machine they would like to search for
const SearchBar: React.FC<SearchBarProps> = ({ getCandyMachineData }) => {
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
      // const nft = await fetchNft(connection, address);
      // console.log(`${nft.name} ${nft.json?.image}`);
      // transfor address to PublicKey object
      const candyMachineId = new PublicKey(address);

      // call getCandyMachineData to obtain mint addresses of each nft
      // and candymachine stats
      getCandyMachineData(candyMachineId);
      // // extract list of candoMachine Creators using candyMachineId
      // console.log('getting creators');
      // const candyMachineCreator = await getCandyMachineCreator(candyMachineId);

      // //connecting to candy machine to get general candy machine info
      // const mx = Metaplex.make(connection);
      // console.log('made connection to Metaplex');
      // const candyMachine = await mx
      //   .candyMachinesV2()
      //   .findByAddress({ address: candyMachineId }); // get candy Machine stats
      // console.log(candyMachine);

      // // finally, get mint addresses using first creator
      // console.log('getting mint addresses');
      // const mintAddresses = await getMintAddresses(
      //   candyMachineCreator[0],
      //   connection
      // );
      // console.log(mintAddresses);

      // // obtain nfts from mindAddresses
      // const nfts = await Promise.all(
      //   mintAddresses.map(async (address) => {
      //     const nft = await fetchNft(connection, address);
      //     console.log(nft);
      //     return { name: nft.name, url: nft.json?.image || '' };
      //   })
      // );

      // console.log(nfts);
      // //setting state
      // setMintAddresses([...mintAddresses]);
    } else alert("Invalid address submitted, please try again!");
  };

  // search box where user inputs candy machine id
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
