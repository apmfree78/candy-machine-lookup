import { useRef, useState } from "react";
import { Connection, clusterApiUrl, PublicKey } from "@solana/web3.js";
import "bulmaswatch/sandstone/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";
import { CandyMachineInfoType } from "./web3/infoAndTypes";
import MintInfo from "./components/MintInfo";
import DisplayNFTs from "./components/DisplayNFTs";
import SearchBar from "./components/SearchBar";
import {
  getCandyMachineCreator,
  getCandyMachineStats,
  getMintAddresses,
} from "./web3/candyMachineV2";

function App() {
  // mint addresses for nfts obtained from candy machine
  const [mintAddresses, setMintAddresses] = useState([""]);
  const [candyMachineStats, setCandyMachineStats] =
    useState<CandyMachineInfoType>({
      items: 0,
      price: 0,
      redeemed: 0,
      remaining: 0,
      royalties: "0%",
      liveDate: new Date(),
      creators: [""],
    });
  const connection = useRef<Connection>(
    new Connection(clusterApiUrl("devnet"))
  );

  // using candyMachineId gets candy machine stats and nft mint addresses
  // and this state is save to state
  const getCandyMachineData = async (candyMachineId: PublicKey) => {
    // extract list of candoMachine Creators using candyMachineId
    console.log("getting creators");
    const candyMachineCreator = await getCandyMachineCreator(candyMachineId);

    // convert creators to abbreviated string to display
    const creators = candyMachineCreator.map((creator) => {
      const _creator = creator.toString();

      return `${_creator.substring(0, 5)}...${_creator.substring(
        _creator.length - 5
      )}`;
    });

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

    // convert UNIX date to Date object
    let UnixTime = 1000;
    if (candyMachineInfo?.goLiveDate)
      UnixTime = candyMachineInfo?.goLiveDate?.toNumber() * 1000;
    const liveDate = new Date(UnixTime);

    //setting state
    setMintAddresses([...mintAddresses]);
    setCandyMachineStats({
      items: candyMachineInfo.itemsAvailable.toNumber(),
      price:
        candyMachineInfo.price.basisPoints.toNumber() /
        10 ** candyMachineInfo.price.currency.decimals,
      redeemed: candyMachineInfo.itemsMinted.toNumber(),
      remaining: candyMachineInfo.itemsRemaining.toNumber(),
      liveDate,
      royalties: (candyMachineInfo.sellerFeeBasisPoints / 100).toString() + "%",
      creators,
    });
  };

  return (
    <div role="container" className="App">
      <h2 className="title is-2" style={{ textAlign: "center" }}>
        Search Candy Machine V2
      </h2>
      {/* Search Bar where user submits Candy Machine ID to look */}
      <SearchBar getCandyMachineData={getCandyMachineData} />
      {candyMachineStats.items === 0 || (
        // show mint price, publish date, mint stats and creator ids
        <MintInfo candyMachineStats={candyMachineStats} />
      )}
      {mintAddresses[0] === "" || (
        <>
          <h3 className="title is-3" style={{ textAlign: "center" }}>
            List of NFTs
          </h3>
          <DisplayNFTs
            connection={connection.current}
            mintAddresses={mintAddresses}
          />
        </>
      )}
    </div>
  );
}

export default App;
