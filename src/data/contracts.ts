import { ContractInfo } from 'types/contract'
import buyAbi from 'data/abi/Buy.json'
import lendAbi from 'data/abi/Lend.json'

export const chainId = '0x1'

export const contracts: { [key: string]: ContractInfo } = {
  buy: {
    address: '0x20e866824204D4741436bf72f0316037e24B2170',
    abi: buyAbi,
    type: 'buy',
  },
  lend: {
    address: '0x3b5202f65639300c1522170864579df50Ad5CE9c',
    abi: lendAbi,
    type: 'lend',
  },
}
