import React, { useEffect, useRef, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import "bulmaswatch/sandstone/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import MintInfo from "./components/MintInfo";
import DisplayNFTs from "./components/DisplayNFTs";
import SearchBar from "./components/SearchBar";
import {
  getCandyMachineCreator,
  getCandyMachineStats,
  getMintAddresses,
} from "./web3/candyMachineV2";
import { Metaplex } from "@metaplex-foundation/js";

export interface NftType {
  name: string;
  url: string;
}

export interface CandyMachineInfoType {
  items: number;
  price: string;
  redeemed: number;
  remaining: number;
  royalties: string;
  liveDate: string;
  creators: string[];
}

function App() {
  const [page, setPage] = useState(1);
  // mint addresses for nfts obtained from candy machine
  const [mintAddresses, setMintAddresses] = useState([""]);
  const [candyMachineStats, setCandyMachineStats] =
    useState<CandyMachineInfoType>({
      items: 0,
      price: "0",
      redeemed: 0,
      remaining: 0,
      royalties: "0%",
      liveDate: "",
      creators: [""],
    });
  const [nfts, setNfts] = useState<NftType[]>([{ name: "", url: "" }]);
  const connection = useRef<Connection>(
    new Connection(clusterApiUrl("devnet"))
  );

  // using candyMachineId gets candy machine stats and nft mint addresses
  // and this state is save to state
  const getCandyMachineData = async (candyMachineId: PublicKey) => {
    // extract list of candoMachine Creators using candyMachineId
    console.log("getting creators");
    const candyMachineCreator = await getCandyMachineCreator(candyMachineId);

    // convert creators to string to display
    const creators = candyMachineCreator.map((creator) => creator.toString());

    //connecting to candy machine to get general candy machine info
    const candyMachineInfo = await getCandyMachineStats(
      candyMachineId,
      connection.current
    );
    console.log(candyMachineInfo);

    // finally, get mint addresses using first creator
    console.log("getting mint addresses");
    const mintAddresses = await getMintAddresses(
      candyMachineCreator[0],
      connection.current
    );
    console.log(mintAddresses);

    //setting state
    setMintAddresses([...mintAddresses]);
    setCandyMachineStats({
      items: candyMachineInfo.itemsAvailable.toNumber(),
      price: candyMachineInfo.price.toString(),
      redeemed: candyMachineInfo.itemsMinted.toNumber(),
      remaining: candyMachineInfo.itemsRemaining.toNumber(),
      liveDate: candyMachineInfo.goLiveDate?.toString() || "",
      royalties: (candyMachineInfo.sellerFeeBasisPoints / 100).toString() + "%",
      creators,
    });
  };

  return (
    <div role="container" className="App">
      <SearchBar
        setMintAddresses={setMintAddresses}
        setNfts={setNfts}
        connection={connection.current}
      />
      <MintInfo />
      {nfts[0].name !== "" && (
        <>
          <h3 className="title is-3" style={{ textAlign: "center" }}>
            List of NFTs
          </h3>
          <DisplayNFTs nfts={nfts} />
        </>
      )}
    </div>
  );
}

export default App;
