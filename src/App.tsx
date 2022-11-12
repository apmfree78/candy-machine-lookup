import React, { useState } from "react";
import "bulmaswatch/sandstone/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import MintInfo from "./components/MintInfo";
import useUser, { User } from "./hooks/useUser";
import DisplayNFTs from "./components/DisplayNFTs";
import SearchBar from "./components/SearchBar";

interface MintAddressType {
  addresses: string[];
}
function App() {
  const [page, setPage] = useState(1);
  const [mintAddresses, setMintAddresses] = useState([""]);
  const users: User[] = useUser(page, 9);

  return (
    <div role="container" className="App">
      <SearchBar setMintAddresses={setMintAddresses} />
      <MintInfo />
      <h3 className="title is-3" style={{ textAlign: "center" }}>
        List of NFTs
      </h3>
      <DisplayNFTs users={users} />
    </div>
  );
}

export default App;
