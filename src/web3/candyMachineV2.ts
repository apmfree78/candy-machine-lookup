import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import {
  TOKEN_METADATA_PROGRAM,
  MAX_METADATA_LEN,
  CANDY_MACHINE_V2_PROGRAM,
  CREATOR_ARRAY_START,
} from "./infoAndTypes";
import bs58 from "bs58";

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

// using nft hash address array ,return nft metadata , including name and url
export const fetchNfts = async (
  connection: Connection,
  addresses: string[]
) => {
  // obtain nfts from addresses
  const nfts = await Promise.all(
    addresses.map(async (address) => {
      const nft = await fetchNft(connection, address);
      console.log(nft);
      return { name: nft.name, url: nft.json?.image || "" };
    })
  );
  return nfts;
};
