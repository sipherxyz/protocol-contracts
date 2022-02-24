// SPDX-License-Identifier: MIT

pragma solidity >=0.6.9 <0.8.0;
pragma abicoder v2;

import "@sipher/royalties/contracts/IRoyaltiesProvider.sol";
import "@sipher/royalties/contracts/LibPart.sol";

contract RoyaltiesRegistryTest {
    event getRoyaltiesTest(LibPart.Part[] royalties);

    function _getRoyalties(
        address royaltiesTest,
        address token,
        uint256 tokenId
    ) external {
        IRoyaltiesProvider withRoyalties = IRoyaltiesProvider(royaltiesTest);
        LibPart.Part[] memory royalties = withRoyalties.getRoyalties(
            token,
            tokenId
        );
        emit getRoyaltiesTest(royalties);
    }
}
