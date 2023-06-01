module.exports = async function ({ethers, deployments}) {
    const {deploy} = deployments
    const accounts = await ethers.getSigners()
    const deployer = accounts[0];

    console.log("deployer address:",deployer.address);

    await deploy('Bls12381', {
        from: deployer.address,
        args: [],
        log: true,
        contract: 'Bls12381',
        deterministicDeployment: false
    })

    let bls = await ethers.getContract('Bls12381');

    console.log("Bls12381 address:", bls.address)

}

module.exports.tags = ['BLS12381']