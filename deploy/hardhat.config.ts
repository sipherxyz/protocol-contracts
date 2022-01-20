/**
 * @type import('hardhat/config').HardhatUserConfig
 */

import { HardhatUserConfig } from "hardhat/types";
import "hardhat-deploy";
import "@openzeppelin/hardhat-upgrades";
import "@nomiclabs/hardhat-truffle5";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 22000,
      },
    },
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    hardhat: {
      allowUnlimitedContractSize: false,
    },
  },

  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    deploy: "deploy",
    deployments: "deployments",
    imports: "imports",
  },
};

export default config;
