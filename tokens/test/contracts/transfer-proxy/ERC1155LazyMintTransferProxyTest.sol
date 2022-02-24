// SPDX-License-Identifier: MIT

pragma solidity >=0.6.9 <0.8.0;
pragma abicoder v2;

import "@sipher/exchange-interfaces/contracts/ITransferProxy.sol";
import "@sipher/lazy-mint/contracts/erc-1155/LibERC1155LazyMint.sol";
import "@sipher/lazy-mint/contracts/erc-1155/IERC1155LazyMint.sol";
import "./OperatorRoleTest.sol";

contract ERC1155LazyMintTransferProxyTest is OperatorRoleTest, ITransferProxy {
    function transfer(
        LibAsset.Asset memory asset,
        address from,
        address to
    ) external override onlyOperator {
        (address token, LibERC1155LazyMint.Mint1155Data memory data) = abi
            .decode(
                asset.assetType.data,
                (address, LibERC1155LazyMint.Mint1155Data)
            );
        IERC1155LazyMint(token).transferFromOrMint(data, from, to, asset.value);
    }
}
