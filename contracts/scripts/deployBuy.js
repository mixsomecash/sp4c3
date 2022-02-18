async function main() {
  const [deployer] = await ethers.getSigners()

  const RATE_MULTIPLIER = 100

  const ADMIN_ADDRESS = deployer.address
  const TOKEN = '0x3A0C9d181Afc5D88827A100B83716E9B412845Ac'
  const NATIVE_RATE = 2000 * RATE_MULTIPLIER

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Contract = await ethers.getContractFactory('Buy')
  const contract = await Contract.deploy(ADMIN_ADDRESS, TOKEN, NATIVE_RATE)

  console.log('Contract address:', contract.address)

  console.log('Setting rates...')
  await contract.setRate('0x74fB2AA2d340c28803AB1c34dD4A701B4e298095', 4 * RATE_MULTIPLIER)
  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
