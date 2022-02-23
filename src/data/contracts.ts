import { ContractInfo } from 'types/contract'
import buyAbi from 'data/abi/Buy.json'
import lendAbi from 'data/abi/Lend.json'

export const chainId = '0x61'

export const contracts: { [key: string]: ContractInfo } = {
  buy: {
    address: '0x18C72C11bb024E8CC5E5f0DF1D80eDD3B1437D4e',
    abi: buyAbi,
    type: 'buy',
  },
  lend: {
    address: '0x9922B1A5Aefb3EF4b1B2326421830d3340296E75',
    abi: lendAbi,
    type: 'lend',
  },
}
