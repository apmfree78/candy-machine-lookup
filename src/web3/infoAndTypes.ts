export interface CandyMachineInfoType {
  items: number;
  price: number;
  redeemed: number;
  remaining: number;
  royalties: string;
  liveDate: Date;
  creators: string[];
}

export interface NftType {
  name: string;
  url: string;
}

export const NFT_PER_PAGE = 9;
