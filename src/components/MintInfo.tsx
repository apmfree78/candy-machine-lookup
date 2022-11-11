// component to print out general info on specific Candy Machine
const MintInfo: React.FC = () => {
  return (
    <section aria-label='candy-machine-data' className='columns'>
      <div className='column'>
        <h5 className='title is-5'>Mint Price</h5>
      </div>
      <div className='column'>

        <h5 className='title is-5'>Mint Stats</h5>
      </div>
      <div className='column'>

        <h5 className='title is-5'>Creators</h5>
      </div>
    </section>
  );
};

export default MintInfo;
