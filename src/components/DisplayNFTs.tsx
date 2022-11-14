import { useRef, useState } from "react";
import { Connection } from "@solana/web3.js";
import { User } from "../hooks/useUser";
import { fetchNfts } from "../web3/candyMachineV2";
import NFTCard from "./NftCard";

export interface NftType {
  name: string;
  url: string;
}
const NFT_PER_PAGE = 9;

// component to display NFTs in a grid with
// up to 3 in each row
const DisplayNFTs: React.FC<{
  connection: Connection;
  mintAddresses: string[];
}> = ({ connection, mintAddresses }) => {
  const [nfts, setNfts] = useState<NftType[]>([{ name: "", url: "" }]);
  const page = useRef(1);
  const TOTAL_NFTs = mintAddresses.length;
  const TOTAL_PAGES = Math.floor(TOTAL_NFTs / NFT_PER_PAGE) + 1;

  // page on current page, slices addresses and call web3 function
  // to get nfts
  const getNftByPage = async (
    pageNumber: number,
    addresses: string[]
  ): Promise<NftType[]> => {
    //starting index
    const firstNFT = (pageNumber - 1) * NFT_PER_PAGE;

    let lastNFT; // position of last nft to be shown on page

    //checking if on last page
    if (pageNumber === TOTAL_PAGES) {
      // on last page, lets calculate remaining NFTs
      const remainingNFTCount = TOTAL_NFTs % NFT_PER_PAGE;

      // add to firstNFT to determine last NFT position
      lastNFT = firstNFT + remainingNFTCount;
    } else {
      // not last page so just add 8
      lastNFT = firstNFT + 8;
    }

    //extracting nfts to show on current page
    const nftsAddressesToShow = addresses.slice(firstNFT, lastNFT + 1);
    //splice addresses based on page
    return await fetchNfts(connection, nftsAddressesToShow);
  };

  // pulls NFTs for current page and sets state
  const showPage = async (pageNumber: number = 1) => {
    // start by updating current page
    page.current = pageNumber;

    //obtain NFTs to show on this page
    const nftData = await getNftByPage(pageNumber, mintAddresses);

    // set state
    setNfts([...nftData]);
  };

  return (
    <>
      <section role="list" className="columns is-multiline">
        {nfts.map((nft, key) => {
          return (
            <div role="listitem" key={key} className="column is-one-third">
              <NFTCard name={nft.name} url={nft.url} />
            </div>
          );
        })}
      </section>
      <div>
        <button
          disabled={page.current === 0}
          onClick={async () => {
            return await showPage(page.current - 1);
          }}
        >
          &#8810; Previous Page
        </button>
        <button
          disabled={page.current === TOTAL_PAGES}
          onClick={async () => {
            return await showPage(page.current + 1);
          }}
        >
          Next Page &#8811;
        </button>
      </div>
    </>
  );
};

export default DisplayNFTs;
