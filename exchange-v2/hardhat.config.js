/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require('hardhat-deploy');
require('@openzeppelin/hardhat-upgrades');
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.7.6",
};
