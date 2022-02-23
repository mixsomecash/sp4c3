async function main() {
  const [deployer] = await ethers.getSigners()

  const RATE_MULTIPLIER = 100

  const ADMIN_ADDRESS = deployer.address
  const TOKEN = '0xbB594eC36dC60c0245561CDD063f70De0D7ea5E5'
  const NATIVE_RATE = 675 * RATE_MULTIPLIER
  const PREMIUM = 3000

  console.log('Deploying contracts with the account:', deployer.address)
  console.log('Account balance:', (await deployer.getBalance()).toString())

  const Contract = await ethers.getContractFactory('Lend')
  const contract = await Contract.deploy(ADMIN_ADDRESS, TOKEN, NATIVE_RATE, PREMIUM)

  console.log('Contract address:', contract.address)

  console.log('Setting rates...')
  await contract.setRate('0x74fB2AA2d340c28803AB1c34dD4A701B4e298095', 0.25 * RATE_MULTIPLIER)
  console.log('Done.')
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
