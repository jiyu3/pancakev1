import { Token } from '@pancakeswap/sdk'
import ChainId from './chainIds'

export const WETH = {
  [ChainId.MAINNET]: new Token(
    336,
    '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
    18,
    'WSDN',
    'Wrapped SDN',
    'https://www.binance.org'
  ),
  [ChainId.TESTNET]: new Token(
    336,
    '0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef',
    18,
    'WSDN',
    'Wrapped SDN',
    'https://www.binance.org'
  )
}


export default WETH