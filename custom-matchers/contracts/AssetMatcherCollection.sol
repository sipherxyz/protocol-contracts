// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "@sipher/exchange-interfaces/contracts/IAssetMatcher.sol";
import "@sipher/lazy-mint/contracts/erc-721/LibERC721LazyMint.sol";
import "@sipher/lazy-mint/contracts/erc-1155/LibERC1155LazyMint.sol";

/*
 * Custom matcher for collection (assetClass, that need any/all elements from collection)
 */
contract AssetMatcherCollection is IAssetMatcher {
    bytes constant EMPTY = "";

    function matchAssets(
        LibAsset.AssetType memory leftAssetType,
        LibAsset.AssetType memory rightAssetType
    ) public view override returns (LibAsset.AssetType memory) {
        if (
            (rightAssetType.assetClass == LibAsset.ERC721_ASSET_CLASS) ||
            (rightAssetType.assetClass ==
                LibERC721LazyMint.ERC721_LAZY_ASSET_CLASS) ||
            (rightAssetType.assetClass == LibAsset.ERC1155_ASSET_CLASS) ||
            (rightAssetType.assetClass ==
                LibERC1155LazyMint.ERC1155_LAZY_ASSET_CLASS) ||
            (rightAssetType.assetClass == LibAsset.CRYPTO_PUNKS)
        ) {
            address leftToken = abi.decode(leftAssetType.data, (address));
            (address rightToken, ) = abi.decode(
                rightAssetType.data,
                (address, uint256)
            );
            if (leftToken == rightToken) {
                return
                    LibAsset.AssetType(
                        rightAssetType.assetClass,
                        rightAssetType.data
                    );
            }
        }
        return LibAsset.AssetType(0, EMPTY);
    }
}
