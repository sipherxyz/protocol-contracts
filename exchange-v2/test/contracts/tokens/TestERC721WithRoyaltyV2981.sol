// SPDX-License-Identifier: MIT

pragma solidity >=0.6.0 <0.8.0;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@sipher/royalties/contracts/Royalties2981TestImpl.sol";
import "@sipher/royalties/contracts/LibRoyalties2981.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TestERC721WithRoyaltyV2981 is
    Initializable,
    Royalties2981TestImpl,
    ERC721Upgradeable,
    OwnableUpgradeable
{
    function initialize() public initializer {
        _registerInterface(LibRoyalties2981._INTERFACE_ID_ROYALTIES);
        __Ownable_init_unchained();
    }

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}
