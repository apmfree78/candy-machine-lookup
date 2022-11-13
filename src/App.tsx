import React, { useEffect, useRef, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
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

  // mint addresses for nfts obtained from candy machine
  const [mintAddresses, setMintAddresses] = useState([""]);
  const connection = useRef<Connection>(
    new Connection(clusterApiUrl("devnet"))
  );
  const users: User[] = useUser(page, 9);

  useEffect(() => {
    // connection.current = new Connection(clusterApiUrl('mainnet-beta'));
  }, []);

  return (
    <div role="container" className="App">
      <SearchBar
        setMintAddresses={setMintAddresses}
        connection={connection.current}
      />
      <MintInfo />
      <h3 className="title is-3" style={{ textAlign: "center" }}>
        List of NFTs
      </h3>
      <DisplayNFTs users={users} />
    </div>
  );
}

export default App;
