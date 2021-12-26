import MULTICALL_ABI from './abi.json'
import ChainId from '../chainIds'

const MULTICALL_NETWORKS: { [chainId in ChainId]: string } = {
  [ChainId.MAINNET]: '0x267252c392b01b7f2F19b5E1842387B9fDd938c1', // TODO
  [ChainId.TESTNET]: '0x267252c392b01b7f2F19b5E1842387B9fDd938c1'
}

export { MULTICALL_ABI, MULTICALL_NETWORKS }
