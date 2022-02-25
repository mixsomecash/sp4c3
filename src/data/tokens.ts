import { DepositToken } from 'types'

export const primaryToken = {
  address: '0x9376495F279Ef7c99b91A24Ee373D784cc74B09e',
  symbol: 'SP4C3',
}

export const depositTokens: DepositToken[] = [
  {
    address: 'native',
    symbol: 'ETH',
    icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
  },
  {
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    symbol: 'USDT',
    icon: 'https://assets.coingecko.com/coins/images/325/large/Tether-logo.png',
  },
]
