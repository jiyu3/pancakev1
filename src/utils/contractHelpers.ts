import { ethers } from 'ethers'
import { simpleRpcProvider } from 'utils/providers'

// Addresses
import {
  getAddress,
  getPancakeProfileAddress,
  getLotteryV2Address,
  getMasterChefAddress,
  getPointCenterIfoAddress,
  getClaimRefundAddress,
  getTradingCompetitionAddress,
  getEasterNftAddress,
  getCakeVaultAddress,
  getIfoPoolAddress,
  getPredictionsAddress,
  getChainlinkOracleAddress,
  getMulticallAddress,
  getFarmAuctionAddress,
  getNftMarketAddress,
  getNftSaleAddress,
  getPancakeSquadAddress,
  getTradingCompetitionAddressV2,
} from 'utils/addressHelpers'

// ABI
import profileABI from 'constants/abis/pancakeProfile.json'
import bep20Abi from 'constants/abis/erc20.json'
import erc721Abi from 'constants/abis/erc721.json'
import lpTokenAbi from 'constants/abis/lpToken.json'
import cakeAbi from 'constants/abis/cake.json'
import ifoV1Abi from 'constants/abis/ifoV1.json'
import ifoV2Abi from 'constants/abis/ifoV2.json'
import pointCenterIfo from 'constants/abis/pointCenterIfo.json'
import lotteryV2Abi from 'constants/abis/lotteryV2.json'
import masterChef from 'constants/abis/masterchef.json'
import sousChef from 'constants/abis/sousChef.json'
import sousChefV2 from 'constants/abis/sousChefV2.json'
import sousChefBnb from 'constants/abis/sousChefBnb.json'
import claimRefundAbi from 'constants/abis/claimRefund.json'
import tradingCompetitionAbi from 'constants/abis/tradingCompetition.json'
import tradingCompetitionV2Abi from 'constants/abis/tradingCompetitionV2.json'
import easterNftAbi from 'constants/abis/easterNft.json'
import cakeVaultAbi from 'constants/abis/cakeVault.json'
import ifoPoolAbi from 'constants/abis/ifoPool.json'
import predictionsAbi from 'constants/abis/predictions.json'
import chainlinkOracleAbi from 'constants/abis/chainlinkOracle.json'
import MultiCallAbi from 'constants/abis/Multicall.json'
import farmAuctionAbi from 'constants/abis/farmAuction.json'
import nftMarketAbi from 'constants/abis/nftMarket.json'
import nftSaleAbi from 'constants/abis/nftSale.json'
import pancakeSquadAbi from 'constants/abis/pancakeSquad.json'
import erc721CollectionAbi from 'constants/abis/erc721collection.json'
import tokens from '../constants/token/tokens'
import { Address, PoolCategory } from '../constants/types'
import { poolsConfig } from '../constants'
import { ChainLinkOracleContract, FarmAuctionContract, PancakeProfileContract, PredictionsContract } from './types'

const getContract = (abi: any, address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  const signerOrProvider = signer ?? simpleRpcProvider
  return new ethers.Contract(address, abi, signerOrProvider)
}

export const getBep20Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(bep20Abi, address, signer)
}
export const getErc721Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(erc721Abi, address, signer)
}
export const getLpContract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lpTokenAbi, address, signer)
}
export const getIfoV1Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV1Abi, address, signer)
}
export const getIfoV2Contract = (address: string, signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoV2Abi, address, signer)
}
export const getSouschefContract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  const abi = config?.poolCategory === PoolCategory.BINANCE ? sousChefBnb : sousChef
  return getContract(abi, getAddress(config?.contractAddress as Address), signer)
}
export const getSouschefV2Contract = (id: number, signer?: ethers.Signer | ethers.providers.Provider) => {
  const config = poolsConfig.find((pool) => pool.sousId === id)
  return getContract(sousChefV2, getAddress(config?.contractAddress as Address), signer)
}
export const getPointCenterIfoContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pointCenterIfo, getPointCenterIfoAddress(), signer)
}
export const getCakeContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeAbi, tokens.cake.address, signer)
}
export const getProfileContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(profileABI, getPancakeProfileAddress(), signer) as PancakeProfileContract
}
export const getLotteryV2Contract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(lotteryV2Abi, getLotteryV2Address(), signer)
}
export const getMasterchefContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(masterChef, getMasterChefAddress(), signer)
}
export const getClaimRefundContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(claimRefundAbi, getClaimRefundAddress(), signer)
}
export const getTradingCompetitionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionAbi, getTradingCompetitionAddress(), signer)
}

export const getTradingCompetitionContractV2 = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(tradingCompetitionV2Abi, getTradingCompetitionAddressV2(), signer)
}
export const getEasterNftContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(easterNftAbi, getEasterNftAddress(), signer)
}
export const getCakeVaultContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(cakeVaultAbi, getCakeVaultAddress(), signer)
}
export const getIfoPoolContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(ifoPoolAbi, getIfoPoolAddress(), signer)
}

export const getPredictionsContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(predictionsAbi, getPredictionsAddress(), signer) as PredictionsContract
}

export const getChainlinkOracleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(chainlinkOracleAbi, getChainlinkOracleAddress(), signer) as ChainLinkOracleContract
}
export const getMulticallContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(MultiCallAbi, getMulticallAddress(), signer)
}
export const getFarmAuctionContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(farmAuctionAbi, getFarmAuctionAddress(), signer) as FarmAuctionContract
}
export const getNftMarketContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftMarketAbi, getNftMarketAddress(), signer)
}
export const getNftSaleContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(nftSaleAbi, getNftSaleAddress(), signer)
}
export const getPancakeSquadContract = (signer?: ethers.Signer | ethers.providers.Provider) => {
  return getContract(pancakeSquadAbi, getPancakeSquadAddress(), signer)
}
export const getErc721CollectionContract = (signer?: ethers.Signer | ethers.providers.Provider, address?: string) => {
  return getContract(erc721CollectionAbi, address as string, signer)
}
