// component to print out general info on specific Candy Machine
const MintInfo: React.FC = () => {
  return (
    <section aria-label="candy-machine-data" className="columns">
      <div className="column" style={{ textAlign: "left" }}>
        <p>
          <p style={{ fontWeight: "bold" }}>Mint Price</p>
          <p>3 SOL</p>
        </p>
        <br />
        <p>
          <p style={{ fontWeight: "bold" }}>Live Date</p>
          <p>Febrary 2, 2022</p>
          <p>6 hours ago</p>
        </p>
      </div>
      <div className="column" style={{ textAlign: "left" }}>
        <h5 className="title is-5">Mint Stats</h5>
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
      <div className="column" style={{ textAlign: "left" }}>
        <h5 className="title is-5">Creators</h5>

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
