import { Token } from '@pancakeswap/sdk'
import ChainId from './chainIds'

const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET as any,
    '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef', // should be replaced jiyu
    18,
  ),
  [ChainId.TESTNET]: new Token(
    ChainId.TESTNET as any,
    '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef', // should be replaced jiyu
    18,
  )
}

export default WETH