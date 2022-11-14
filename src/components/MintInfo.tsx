import { CandyMachineInfoType } from "../web3/infoAndTypes";
// component to print out general info on specific Candy Machine
const MintInfo: React.FC<{ candyMachineStats: CandyMachineInfoType }> = ({
  candyMachineStats,
}) => {
  return (
    <section aria-label="candy-machine-data" className="columns">
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <div>
          <p style={{ fontWeight: "bold" }}>{candyMachineStats.price}</p>
          <p>3 SOL</p>
        </div>
        <br />
        <div>
          <p style={{ fontWeight: "bold" }}>{candyMachineStats.liveDate}</p>
          <p>Febrary 2, 2022</p>
          <p>6 hours ago</p>
        </div>
      </div>
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>Mint Stats</p>
        <table className="table">
          <tbody>
            <tr>
              <td>Items Avaliable</td>
              <td>{candyMachineStats.items}</td>
            </tr>
            <tr>
              <td>Items Redeemed</td>
              <td>
                `${candyMachineStats.redeemed}/${candyMachineStats.items}`
              </td>
            </tr>
            <tr>
              <td>Items Remaining</td>
              <td>
                `${candyMachineStats.remaining}/${candyMachineStats.items}`
              </td>
            </tr>
            <tr>
              <td>{candyMachineStats.royalties}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>Creators</p>

        <table className="table">
          <tbody>
            {candyMachineStats.creators.map((creator) => {
              return (
                <tr>
                  <td>{creator}</td>
                  {/* <td>25%</td> */}
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
