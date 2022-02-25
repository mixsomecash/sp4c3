async function main() {
  const [deployer] = await ethers.getSigners()

  const RATE_MULTIPLIER = 100

  const ADMIN_ADDRESS = deployer.address
  const TOKEN = '0x9376495F279Ef7c99b91A24Ee373D784cc74B09e'
  const NATIVE_RATE = 675 * RATE_MULTIPLIER
  const PREMIUM = 1000

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Contract = await ethers.getContractFactory('Lend')
  const contract = await Contract.deploy(ADMIN_ADDRESS, TOKEN, NATIVE_RATE, PREMIUM)

  console.log('Contract address:', contract.address)

  console.log('Setting rates...')
  await contract.setRate('0xdAC17F958D2ee523a2206206994597C13D831ec7', 0.25 * RATE_MULTIPLIER)
  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
