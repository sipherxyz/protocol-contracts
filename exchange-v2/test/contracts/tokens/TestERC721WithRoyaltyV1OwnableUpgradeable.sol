// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@sipher/royalties/contracts/impl/RoyaltiesV1Impl.sol";
import "@sipher/royalties/contracts/LibRoyaltiesV1.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract TestERC721WithRoyaltiesV1OwnableUpgradeable is
    Initializable,
    RoyaltiesV1Impl,
    ERC721Upgradeable,
    OwnableUpgradeable
{
    function initialize() public initializer {
        _registerInterface(LibRoyaltiesV1._INTERFACE_ID_FEES);
        __Ownable_init_unchained();
    }

    function mint(
        address to,
        uint256 tokenId,
        LibPart.Part[] memory _fees
    ) external {
        _mint(to, tokenId);
        _saveRoyalties(tokenId, _fees);
    }
}
