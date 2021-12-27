import { Token } from '@pancakeswap/sdk'
import ChainId from './chainIds'

const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', // should be replaced jiyu
    18,
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e', // should be replaced jiyu
    18,
  )
}

export default WETH