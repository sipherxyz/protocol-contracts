import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const deployResult = await deploy("ERC20TransferProxy", {
    from: deployer,
    log: true,
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks,
  });

  const contract = await hre.ethers.getContractAt(
    deployResult.abi,
    deployResult.address,
    deployer
  );
  await contract.__OperatorRole_init();
};
export default func;
func.tags = ["ERC20TransferProxy"];
