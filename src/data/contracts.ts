import { ContractInfo } from 'types/contract'
import buyAbi from 'data/abi/Buy.json'
import lendAbi from 'data/abi/Lend.json'

export const chainId = '0x61'

export const contracts: { [key: string]: ContractInfo } = {
  buy: {
    address: '0x4b6776CD54fABB88ED02fd6C67Fdef238cD1bA59',
    abi: buyAbi,
    type: 'buy',
  },
  lend: {
    address: '0x9e266268a7451d33b117FdF76C8cfbC51f992d94',
    abi: lendAbi,
    type: 'lend',
  },
}
