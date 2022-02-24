// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";
import "@sipher/royalties/contracts/LibRoyaltiesV2.sol";
import "@sipher/royalties/contracts/RoyaltiesV2.sol";
import "@sipher/royalties/contracts/impl/AbstractRoyalties.sol";

contract TestERC1155WithRoyaltiesV2_InterfaceError is
    Initializable,
    AbstractRoyalties,
    RoyaltiesV2,
    ERC1155Upgradeable
{
    function mint(
        address to,
        uint256 tokenId,
        LibPart.Part[] memory _fees,
        uint256 amount
    ) external {
        _registerInterface(LibRoyaltiesV2._INTERFACE_ID_ROYALTIES);
        _mint(to, tokenId, amount, "");
        _saveRoyalties(tokenId, _fees);
    }

    function getSipherV2Royalties(uint256)
        external
        pure
        override
        returns (LibPart.Part[] memory)
    {
        revert("getSipherV2Royalties failed");
    }

    function _onRoyaltiesSet(uint256 _id, LibPart.Part[] memory _fees)
        internal
        override
    {}
}
