const UJToken = artifacts.require("UJToken");
const FeesColector = artifacts.require("FeesColector");

module.exports = async function (deployer, network, address) {
    [admin, student, _] = address

    if (network === 'development') {
      await deployer.deploy(UJToken);
      const ujtoken = await UJToken.deployed();

      ujtoken.mint(admin, web3.utils.toWei("10000"));
      ujtoken.mint(student, web3.utils.toWei("10000"));

      await deployer.deploy(FeesColector, ujtoken.address, admin);
    } else {
      const ADMIN_ADDRESS = "";
      const UJT_ADDRESS = "";
      await deployer.deploy(FeesColector, UJT_ADDRESS, ADMIN_ADDRESS);
    }
    


  await deployer.deploy(FeesColector, UJToken.address, admin);
};
