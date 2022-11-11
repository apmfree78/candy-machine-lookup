import { User } from "../hooks/useUser";
import NFTCard from "./NftCard";

// component to display NFTs in a grid with
// up to 3 in each row
const DisplayNFTs: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <section role="list" className="columns  is-multiline">
      {users.map((user, key) => {
        return (
          <div role="listitem" key={key} className="column is-one-third">
            <NFTCard name={user.name} url={user.picture} />
          </div>
        );
      })}
    </section>
  );
};

export default DisplayNFTs;
