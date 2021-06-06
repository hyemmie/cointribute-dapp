import { BigNumber } from "@ethersproject/bignumber";

export type DonationType = [
  title: string,
  status: BigNumber,
  contents: string,
  startDate: BigNumber,
  closedDate: BigNumber,
  coinName: string,
  coinSymbol: string,
  donationFundingAddress: number,
  donationFundingAmount: number
];
