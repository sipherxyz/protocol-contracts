import fs from "fs";
import path from "path";

import { ethers } from "ethers";

/**
 *
 * @param contractName name of the contract
 * @param network blockchain network
 */

const readContractAddress = (contractName: string, network = "hardhat") => {
  const filePath = path.join(
    __dirname,
    "../deployments",
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

const hashId = (str: string) => {
  return `${ethers.utils.id(str).substring(0, 10)}`;
};

export { readContractAddress, hashId };
