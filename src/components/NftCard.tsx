const NTFCard: React.FC<{ name: string; url: string }> = ({ name, url }) => {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={url} alt="nft" />
        </figure>
      </div>
      <div className="content">{name}</div>
    </div>
  );
};
