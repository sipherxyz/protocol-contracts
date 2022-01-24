import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;

  const ExchangeV2 = await ethers.getContract("ExchangeV2");
  const ERC721LazyMintTransferProxy = await ethers.getContract(
    "ERC721LazyMintTransferProxy"
  );
  const ERC1155LazyMintTransferProxy = await ethers.getContract(
    "ERC1155LazyMintTransferProxy"
  );

  await (
    await ERC721LazyMintTransferProxy.addOperator(ExchangeV2.address)
  ).wait();
  await (
    await ERC1155LazyMintTransferProxy.addOperator(ExchangeV2.address)
  ).wait();

  // Add exchange to operator
  const TransferProxy = await ethers.getContract("TransferProxy");
  await (await TransferProxy.addOperator(ExchangeV2.address)).wait();

  const ERC20TransferProxy = await ethers.getContract("ERC20TransferProxy");
  await (await ERC20TransferProxy.addOperator(ExchangeV2.address)).wait();
};
export default func;
func.tags = ["AddOperator"];
