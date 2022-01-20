import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { readContractAddress } from "../../util";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getUnnamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const [recipient] = await getUnnamedAccounts();

  const transferProxyInfo = readContractAddress("TransferProxy");

  const erc20TransferProxyInfo = readContractAddress("ERC20TransferProxy");

  const royaltyRegistryInfo = readContractAddress("RoyaltiesRegistry");

  const deployResult = await deploy("ExchangeV2", {
    from: deployer,
    log: true,
    proxy: {
      owner: deployer,
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "__ExchangeV2_init",
          args: [
            transferProxyInfo.address,
            erc20TransferProxyInfo.address,
            0,
            recipient,
            royaltyRegistryInfo.address,
          ],
        },
      },
    },
    autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
  });

  // Add exchange to operator
  const TransferProxy = await ethers.getContractAt(
    transferProxyInfo.abi,
    transferProxyInfo.address,
    deployer
  );
  await TransferProxy.addOperator(deployResult.address);

  const ERC20TransferProxy = await ethers.getContractAt(
    erc20TransferProxyInfo.abi,
    erc20TransferProxyInfo.address,
    deployer
  );
  await ERC20TransferProxy.addOperator(deployResult.address);
};
export default func;
func.tags = ["RoyaltiesRegistry"];
