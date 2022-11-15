import { CandyMachineInfoType } from "../web3/infoAndTypes";
// table component to print out general info on specific Candy Machine
const MintInfo: React.FC<{ candyMachineStats: CandyMachineInfoType }> = ({
  candyMachineStats,
}) => {
  // correctly formatted date
  const liveDate = `${candyMachineStats.liveDate.getMonth()}/${candyMachineStats.liveDate.getDate()}/${candyMachineStats.liveDate.getFullYear()}`;

  // destructing all data from candyMachineStats
  const { price, items, redeemed, remaining, royalties, creators } =
    candyMachineStats;

  return (
    <section aria-label="candy-machine-data" className="columns">
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <div>
          <p style={{ fontWeight: "bold" }}>Mint Price</p>
          <p>{price} SOL</p>
        </div>
        <br />
        <div>
          <p style={{ fontWeight: "bold" }}>Live date</p>
          <p>{liveDate}</p>
          {/* <p>6 hours ago</p> */}
        </div>
      </div>
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>Mint Stats</p>
        <table className="table">
          <tbody>
            <tr>
              <td>Items Avaliable</td>
              <td>{items}</td>
            </tr>
            <tr>
              <td>Items Redeemed</td>
              <td>{`${redeemed}/${items}`}</td>
            </tr>
            <tr>
              <td>Items Remaining</td>
              <td>{`${remaining}/${items}`}</td>
            </tr>
            <tr>
              <td>Royalties</td>
              <td>{royalties}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>Creators</p>

        <table className="table">
          <tbody>
            {creators.map((creator, index) => {
              return (
                <tr key={index}>
                  <td>{creator}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MintInfo;
