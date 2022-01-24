import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { hashId, readContractAddress } from "../utils/util";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getUnnamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const [recipient] = await getUnnamedAccounts();

  const transferProxyInfo = await hre.ethers.getContract("TransferProxy");

  const erc20TransferProxyInfo = await hre.ethers.getContract(
    "ERC20TransferProxy"
  );

  const royaltyRegistryInfo = await hre.ethers.getContract("RoyaltiesRegistry");

  const assetMatcherCollection = await hre.ethers.getContract(
    "AssetMatcherCollection"
  );

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

  const ExchangeV2 = await ethers.getContractAt(
    deployResult.abi,
    deployResult.address,
    deployer
  );
  await (
    await ExchangeV2.setAssetMatcher(
      hashId("COLLECTION"),
      assetMatcherCollection.address
    )
  ).wait();
};
export default func;
func.tags = ["ExchangeV2"];
