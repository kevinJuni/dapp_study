const Tether = artifacts.require('Tether');
const RWD = artifacts.require('RWD');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, account){

    await deployer.deploy(Tether);
    const tether = await Tether.deployed();

    await deployer.deploy(RWD);
    const rwd = await RWD.deployed();

    await deployer.deploy(DecentralBank, rwd.address, tether.address);
    const decentralBank = await DecentralBank.deployed();

    await rwd.transfer(decentralBank.address,'1000000000000000000');

    await tether.transfer(account[1],'10000000000000');
}