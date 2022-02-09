import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;

  const Exchange = await ethers.getContract("Exchange");
  const ERC721LazyMintTransferProxy = await ethers.getContract(
    "ERC721LazyMintTransferProxy"
  );
  const ERC1155LazyMintTransferProxy = await ethers.getContract(
    "ERC1155LazyMintTransferProxy"
  );

  await (
    await ERC721LazyMintTransferProxy.addOperator(Exchange.address)
  ).wait();
  await (
    await ERC1155LazyMintTransferProxy.addOperator(Exchange.address)
  ).wait();

  // Add exchange to operator
  const TransferProxy = await ethers.getContract("TransferProxy");
  await (await TransferProxy.addOperator(Exchange.address)).wait();

  const ERC20TransferProxy = await ethers.getContract("ERC20TransferProxy");
  await (await ERC20TransferProxy.addOperator(Exchange.address)).wait();
};
export default func;
func.tags = ["AddOperator"];
