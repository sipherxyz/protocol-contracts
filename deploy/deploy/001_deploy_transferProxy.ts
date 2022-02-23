import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const deployResult = await deploy("TransferProxy", {
    from: deployer,
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks,
  });

  const contract = await hre.ethers.getContractAt(deployResult.abi, deployResult.address, deployer);
  try {
    await (await contract.__OperatorRole_init()).wait();
  } catch (err) {
    console.log("Already initialized, skipping");
  }
};
export default func;
func.tags = ["TransferProxy"];
