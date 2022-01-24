import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const ERC721LazyMintTransferProxyDeployResult = await deploy(
    "ERC721LazyMintTransferProxy",
    {
      from: deployer,
      log: true,
      autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks,
    }
  );

  const ERC721LazyMintTransferProxy = await hre.ethers.getContractAt(
    ERC721LazyMintTransferProxyDeployResult.abi,
    ERC721LazyMintTransferProxyDeployResult.address,
    deployer
  );
  try {
    await (await ERC721LazyMintTransferProxy.__OperatorRole_init()).wait();
  } catch (err) {
    console.log("Already initialized, skipping");
  }

  const ERC1155LazyMintTransferProxyDeployResult = await deploy(
    "ERC1155LazyMintTransferProxy",
    {
      from: deployer,
      log: true,
      autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks,
    }
  );

  const ERC1155LazyMintTransferProxy = await hre.ethers.getContractAt(
    ERC1155LazyMintTransferProxyDeployResult.abi,
    ERC1155LazyMintTransferProxyDeployResult.address,
    deployer
  );
  try {
    await (await ERC1155LazyMintTransferProxy.__OperatorRole_init()).wait();
  } catch (err) {
    console.log("Already initialized, skipping");
  }
};
export default func;
func.tags = ["LazyMint"];
