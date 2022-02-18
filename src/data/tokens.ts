import { DepositToken } from 'types'

export const primaryToken = {
  address: '0x3a0c9d181afc5d88827a100b83716e9b412845ac',
  symbol: 'SP4C3',
}

export const depositTokens: DepositToken[] = [
  {
    address: 'native',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    address: '0x74fB2AA2d340c28803AB1c34dD4A701B4e298095',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
  },
]
