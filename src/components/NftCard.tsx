// display individual NFT with name below, can be expanded to show
// nft attributes etc
const NFTCard: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <div
      className="card"
      style={{
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <div className="card-image">
        <figure className="image">
          <img src={url} alt="nft" />
        </figure>
      </div>
      <div className="content" style={{ textAlign: "center" }}>
        {name}
      </div>
    </div>
  );
};

export default NFTCard;
