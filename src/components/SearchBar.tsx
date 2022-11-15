import { PublicKey } from "@metaplex-foundation/js";
import { useState } from "react";

interface SearchBarProps {
  getCandyMachineData: (candyMachineId: PublicKey) => void;
  loading: boolean;
}

// search bar for user to input Candy Machine they would like to search for
const SearchBar: React.FC<SearchBarProps> = ({
  getCandyMachineData,
  loading,
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
      // const nft = await fetchNft(connection, address);
      // console.log(`${nft.name} ${nft.json?.image}`);
      // transfor address to PublicKey object
      const candyMachineId = new PublicKey(address);

      // call getCandyMachineData to obtain mint addresses of each nft
      // and candymachine stats
      getCandyMachineData(candyMachineId);
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
          className={`button is-info is-large ${loading && "isloading"}`}
          disabled={address === "" || loading}
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
