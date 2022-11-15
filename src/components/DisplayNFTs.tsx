import { useEffect, useRef, useState } from "react";
import { Connection } from "@solana/web3.js";
import { NFT_PER_PAGE, NftType } from "../web3/infoAndTypes";
import { fetchNfts } from "../web3/candyMachineV2";
import NFTCard from "./NftCard";

// component to display NFTs in a grid with
// up to 3 in each row
const DisplayNFTs: React.FC<{
  connection: Connection;
  mintAddresses: string[];
}> = ({ connection, mintAddresses }) => {
  const [nfts, setNfts] = useState<NftType[]>([{ name: "", url: "" }]);
  const page = useRef(1);
  const TOTAL_NFTs = mintAddresses.length;
  const TOTAL_PAGES = Math.ceil(TOTAL_NFTs / NFT_PER_PAGE);
  console.log("total page", TOTAL_PAGES);
  console.log("total nfs", TOTAL_NFTs);

  // show first page when page first loads
  useEffect(() => {
    (async () => await showPage(1))();
  }, []);
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

      // TOTAL_NFTs % NFT_PER_PAGE === 0 then there
      // is no remainder
      if (TOTAL_NFTs % NFT_PER_PAGE === 0)
        lastNFT = firstNFT + NFT_PER_PAGE - 1;
      else lastNFT = firstNFT + remainingNFTCount;
      // add to firstNFT to determine last NFT position
    } else {
      // not last page so just add 8
      lastNFT = firstNFT + NFT_PER_PAGE - 1;
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
      {/* pagination buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "1vh",
          paddingBottom: "3vh",
        }}
      >
        <button
          className="button is-info is-small is-rounded"
          disabled={page.current === 1}
          onClick={async () => {
            return await showPage(page.current - 1);
          }}
        >
          &#8810; Previous Page
        </button>
        {`Page ${page.current} of ${TOTAL_PAGES}`}
        <button
          className="button is-info is-small is-rounded"
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
