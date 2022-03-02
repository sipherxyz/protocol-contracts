#!/usr/bin/env bash
truffle test ./test/erc-1155/ERC1155SipherUser.test.js \
              ./contracts/create-2/ERC1155SipherUserFactoryC2.sol \
              ./test/contracts/TestERC1271.sol \
              ./test/contracts/TestRoyaltyV2981Calculate.sol