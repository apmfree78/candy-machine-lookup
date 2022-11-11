// component to print out general info on specific Candy Machine
const MintInfo: React.FC = () => {
  return (
    <section aria-label="candy-machine-data" className="columns">
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <div>
          <p style={{ fontWeight: "bold" }}>Mint Price</p>
          <p>3 SOL</p>
        </div>
        <br />
        <div>
          <p style={{ fontWeight: "bold" }}>Live Date</p>
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
              <td>10000</td>
            </tr>
            <tr>
              <td>Items Redeemed</td>
              <td>7422/10000</td>
            </tr>
            <tr>
              <td>Items Remaining</td>
              <td>2578/10000</td>
            </tr>
            <tr>
              <td>Royalties</td>
              <td>5%</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="column is-one-third" style={{ textAlign: "left" }}>
        <p style={{ fontWeight: "bold" }}>Creator</p>

        <table className="table">
          <tbody>
            <tr>
              <td>J9wb...WG43</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>8wea...WcNJ</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>6vPMH...wbvU</td>
              <td>25%</td>
            </tr>
            <tr>
              <td>DpZJ...xGct</td>
              <td>25%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MintInfo;
