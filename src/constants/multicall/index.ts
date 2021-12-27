import MULTICALL_ABI from './abi.json'
import ChainId from '../chainIds'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x7d5d845Fd0f763cefC24A1cb1675669C3Da62615', // TODO
  [ChainId.TESTNET]: '0x7d5d845Fd0f763cefC24A1cb1675669C3Da62615'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
