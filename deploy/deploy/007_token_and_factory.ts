import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, ethers } = hre;
  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  const TransferProxy = await ethers.getContract("TransferProxy");
  const ERC721LazyMintTransferProxy = await ethers.getContract(
    "ERC721LazyMintTransferProxy"
  );
  const ERC1155LazyMintTransferProxy = await ethers.getContract(
    "ERC1155LazyMintTransferProxy"
  );

  const ERC721Sipher = await deploy("ERC721Sipher", {
    from: deployer,
    log: true,
    autoMine: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "__ERC721Sipher_init",
          args: [
            "Sipher",
            "RARI",
            "ipfs:/",
            "",
            TransferProxy.address,
            ERC721LazyMintTransferProxy.address,
          ],
        },
      },
    },
  });

  const ERC721SipherBeacon = await deploy("ERC721SipherBeacon", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [ERC721Sipher.implementation],
  });

  const ERC1155Sipher = await deploy("ERC721Sipher", {
    from: deployer,
    log: true,
    autoMine: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "__ERC1155Sipher_init",
          args: [
            "Sipher",
            "RARI",
            "ipfs:/",
            "",
            TransferProxy.address,
            ERC1155LazyMintTransferProxy.address,
          ],
        },
      },
    },
  });

  const ERC1155SipherBeacon = await deploy("ERC1155SipherBeacon", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [ERC1155Sipher.implementation],
  });
};
export default func;
func.tags = ["TokenAndFactory"];
