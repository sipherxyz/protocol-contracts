#!/usr/bin/env bash
truffle test ./test/erc-721/ERC721Factories.test.js \
              ./contracts/create-2/ERC721SipherUserFactoryC2.sol \
              ./contracts/erc-721/ERC721SipherUser.sol \
              ./contracts/create-2/ERC721SipherFactoryC2.sol \
              ./contracts/erc-721/ERC721Sipher.sol \
