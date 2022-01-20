import fs from "fs";
import path from "path";

/**
 *
 * @param contractName name of the contract
 * @param network blockchain network
 */

const readContractAddress = (contractName: string, network = "hardhat") => {
  const filePath = path.join(
    __dirname,
    "deploy/deployments",
    network,
    `${contractName}.json`
  );

  console.debug(`Reading ${contractName} address at ${filePath}`);
  const readAddresssJson = fs.readFileSync(filePath, {
    encoding: "utf8",
  });
  if (!readAddresssJson) {
    throw new Error(`Fail to read ${contractName} address`);
  }
  const address = JSON.parse(readAddresssJson);
  return address;
};

export { readContractAddress };
