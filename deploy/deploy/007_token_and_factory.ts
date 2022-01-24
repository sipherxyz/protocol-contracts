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

  const ERC721Rarible = await deploy("ERC721Rarible", {
    from: deployer,
    log: true,
    autoMine: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "__ERC721Rarible_init",
          args: [
            "Rarible",
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

  const ERC721RaribleBeacon = await deploy("ERC721RaribleBeacon", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [ERC721Rarible.implementation],
  });

  const ERC1155Rarible = await deploy("ERC721Rarible", {
    from: deployer,
    log: true,
    autoMine: true,
    proxy: {
      proxyContract: "OpenZeppelinTransparentProxy",
      execute: {
        init: {
          methodName: "__ERC1155Rarible_init",
          args: [
            "Rarible",
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

  const ERC1155RaribleBeacon = await deploy("ERC1155RaribleBeacon", {
    from: deployer,
    log: true,
    autoMine: true,
    args: [ERC1155Rarible.implementation],
  });
};
export default func;
func.tags = ["TokenAndFactory"];
