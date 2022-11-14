import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import bs58 from "bs58";

const MAX_NAME_LENGTH = 32;
const MAX_URI_LENGTH = 200;
const MAX_SYMBOL_LENGTH = 10;
const MAX_CREATOR_LEN = 32 + 1 + 1;
const MAX_CREATOR_LIMIT = 5;
const MAX_DATA_SIZE =
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  4 +
  MAX_URI_LENGTH +
  2 +
  1 +
  4 +
  MAX_CREATOR_LIMIT * MAX_CREATOR_LEN;
const MAX_METADATA_LEN = 1 + 32 + 32 + MAX_DATA_SIZE + 1 + 1 + 9 + 172;
const CREATOR_ARRAY_START =
  1 +
  32 +
  32 +
  4 +
  MAX_NAME_LENGTH +
  4 +
  MAX_URI_LENGTH +
  4 +
  MAX_SYMBOL_LENGTH +
  2 +
  1 +
  4;

const TOKEN_METADATA_PROGRAM = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);
const CANDY_MACHINE_V2_PROGRAM = new PublicKey(
  "cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ"
);

// use candyMachineId to extract mint addresses
// of nfts in collection
export const getMintAddresses = async (
  firstCreatorAddress: PublicKey,
  connection: Connection
) => {
  const metadataAccounts = await connection.getProgramAccounts(
    TOKEN_METADATA_PROGRAM,
    {
      // The mint address is located at byte 33 and lasts for 32 bytes.
      dataSlice: { offset: 33, length: 32 },
      filters: [
        // Only get Metadata accounts.
        { dataSize: MAX_METADATA_LEN },
        // Filter using the first creator.
        {
          memcmp: {
            offset: CREATOR_ARRAY_START,
            bytes: firstCreatorAddress.toBase58(),
          },
        },
      ],
    }
  );
  return metadataAccounts.map((metadataAccountInfo) =>
    bs58.encode(metadataAccountInfo.account.data)
  );
};

// using candymachine id , get candy machine creators
export const getCandyMachineCreator = async (
  candyMachine: PublicKey
): Promise<[PublicKey, number]> =>
  PublicKey.findProgramAddress(
    [Buffer.from("candy_machine"), candyMachine.toBuffer()],
    CANDY_MACHINE_V2_PROGRAM
  );

//connecting to candy machine to get general candy machine info
export const getCandyMachineStats = async (
  candyMachineId: PublicKey,
  connection: Connection
) => {
  const mx = Metaplex.make(connection);
  console.log("made connection to Metaplex");
  const candyMachine = await mx
    .candyMachinesV2()
    .findByAddress({ address: candyMachineId }); // get candy Machine stats
  console.log(candyMachine);
  return candyMachine;
};

// using nft hash address ,return nft metadata , including name and url
export const fetchNft = async (connection: Connection, address: string) => {
  const mx = Metaplex.make(connection);
  const asset = await mx
    .nfts()
    .findByMint({ mintAddress: new PublicKey(address) });
  return asset;
};

// using nft hash address ,return nft metadata , including name and url
export const fetchNfts = async (
  connection: Connection,
  addresses: string[]
) => {
  const mx = Metaplex.make(connection);
  // obtain nfts from mindAddresses
  const nfts = await Promise.all(
    addresses.map(async (address) => {
      const nft = await fetchNft(connection, address);
      console.log(nft);
      return { name: nft.name, url: nft.json?.image || "" };
    })
  );
  return nfts;
};
