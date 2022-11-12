import { Metaplex } from "@metaplex-foundation/js";
import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

// establishing connection to Solana mainnet-beta
const connection = new Connection(clusterApiUrl("mainnet-beta"));
const metaplex = new Metaplex(connection);

export const getCandyMachine = async (publicKey: string) => {
  const candyMachine = await metaplex
    .candyMachines()
    .findByAddress({ address: new PublicKey(publicKey) })
    .catch((err) => console.error(err));
  return candyMachine;
};
