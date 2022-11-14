export interface CandyMachineInfoType {
  items: number;
  price: string;
  redeemed: number;
  remaining: number;
  royalties: string;
  liveDate: string;
  creators: string[];
}

export interface NftType {
  name: string;
  url: string;
}

const NFT_PER_PAGE = 9;
