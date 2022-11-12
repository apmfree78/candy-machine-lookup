import { useState } from "react";
import { getCandyMachine } from "../web3/getCandyMachine";

interface SearchBarProps {
  setCandyAddress: (address: string) => void;
}

// search bar for user to input Candy Machine they would like to search for
const SearchBar: React.FC<SearchBarProps> = ({ setCandyAddress }) => {
  const [address, setAddress] = useState("");

  // update current input to state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ///update state
    setAddress(e.target.value);
  };

  const handleSubmit = () => {
    //first validate address is a valid solana address
    const validator = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    const isValid = validator.test(address);

    // if valid set address
    if (isValid) {
      setCandyAddress(address);
      // getCandyMachine(address);
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
