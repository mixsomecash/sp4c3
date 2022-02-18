import { ContractInfo } from 'types/contract'
import buyAbi from 'data/abi/Buy.json'
import lendAbi from 'data/abi/Lend.json'

export const chainId = '0x1'

export const contracts: { [key: string]: ContractInfo } = {
  buy: {
    address: '0x4b6776CD54fABB88ED02fd6C67Fdef238cD1bA59',
    abi: buyAbi,
    type: 'buy',
  },
  lend: {
    address: '0xA45B141E013ea1fDD89A1dF61B9828D4E75D1071',
    abi: lendAbi,
    type: 'lend',
  },
}
