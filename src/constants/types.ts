import BigNumber from 'bignumber.js'
import { Token } from '@pancakeswap/sdk'

export interface Address {
  56?: string
  336?: string
}

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
  projectLink?: string
}

export enum PoolCategory {
  'COMMUNITY' = 'Community',
  'CORE' = 'Core',
  'BINANCE' = 'Binance', // Pools using native BNB behave differently than pools using a token
  'AUTO' = 'Auto',
}

interface FarmConfigBaseProps {
  pid: number
  lpSymbol: string
  lpAddresses: Address
  multiplier?: string
  isCommunity?: boolean
  dual?: {
    rewardPerBlock: number
    earnLabel: string
    endBlock: number
  }
}

export interface SerializedFarmConfig extends FarmConfigBaseProps {
  token: SerializedToken
  quoteToken: SerializedToken
}

export interface DeserializedFarmConfig extends FarmConfigBaseProps {
  token: Token
  quoteToken: Token
}

interface PoolConfigBaseProps {
  sousId: number
  contractAddress: Address
  poolCategory: PoolCategory
  tokenPerBlock: string
  sortOrder?: number
  harvest?: boolean
  isFinished?: boolean
  enableEmergencyWithdraw?: boolean
}

export interface SerializedPoolConfig extends PoolConfigBaseProps {
  earningToken: SerializedToken
  stakingToken: SerializedToken
}

export interface DeserializedPoolConfig extends PoolConfigBaseProps {
  earningToken: Token
  stakingToken: Token
}

export type Images = {
  lg: string
  md: string
  sm: string
  ipfs?: string
}

export type TeamImages = {
  alt: string
} & Images

export type Team = {
  id: number
  name: string
  description: string
  isJoinable?: boolean
  users: number
  points: number
  images: TeamImages
  background: string
  textColor: string
}

export type CampaignType = 'ifo' | 'teambattle' | 'participation'

// Farm Auction
export interface FarmAuctionBidderConfig {
  account: string
  farmName: string
  tokenAddress: string
  quoteToken: Token
  tokenName: string
  projectSite?: string
  lpAddress?: string
}

// Note: this status is slightly different compared to 'status' comfing
// from Farm Auction smart contract
export enum AuctionStatus {
  ToBeAnnounced, // No specific dates/blocks to display
  Pending, // Auction is scheduled but not live yet (i.e. waiting for startBlock)
  Open, // Auction is open for bids
  Finished, // Auction end block is reached, bidding is not possible
  Closed, // Auction was closed in smart contract
}

export interface Auction {
  id: number
  status: AuctionStatus
  startBlock: number
  startDate: Date
  endBlock: number
  endDate: Date
  auctionDuration: number
  initialBidAmount: number
  topLeaderboard: number
  leaderboardThreshold: BigNumber
}

export interface BidderAuction {
  id: number
  amount: BigNumber
  claimed: boolean
}

export interface Bidder extends FarmAuctionBidderConfig {
  position?: number
  isTopPosition: boolean
  samePositionAsAbove: boolean
  amount: BigNumber
}

export interface ConnectedBidder {
  account: string
  isWhitelisted: boolean
  bidderData?: Bidder
}
