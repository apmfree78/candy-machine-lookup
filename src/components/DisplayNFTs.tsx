import { User } from "../hooks/useUser";
import { NftType } from "../App";
import NFTCard from "./NftCard";

// component to display NFTs in a grid with
// up to 3 in each row
const DisplayNFTs: React.FC<{ nfts: NftType[] }> = ({ nfts }) => {
  return (
    <section role="list" className="columns is-multiline">
      {nfts.map((nft, key) => {
        return (
          <div role="listitem" key={key} className="column is-one-third">
            <NFTCard name={nft.name} url={nft.url} />
          </div>
        );
      })}
    </section>
  );
};

export default DisplayNFTs;
