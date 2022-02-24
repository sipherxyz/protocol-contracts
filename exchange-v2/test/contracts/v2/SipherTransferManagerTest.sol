// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "../../../contracts/SipherTransferManager.sol";
import "../../../contracts/ITransferExecutor.sol";
import "../../../contracts/OrderValidator.sol";
import "@sipher/royalties/contracts/IRoyaltiesProvider.sol";

contract SipherTransferManagerTest is
    SipherTransferManager,
    TransferExecutor,
    OrderValidator
{
    function encodeV2(LibOrderDataV2.DataV2 memory data)
        external
        pure
        returns (bytes memory)
    {
        return abi.encode(data);
    }

    function checkDoTransfers(
        LibAsset.AssetType memory makeMatch,
        LibAsset.AssetType memory takeMatch,
        LibFill.FillResult memory fill,
        LibOrder.Order memory leftOrder,
        LibOrder.Order memory rightOrder
    ) external payable {
        doTransfers(
            makeMatch,
            takeMatch,
            fill,
            leftOrder,
            rightOrder,
            LibOrderData.parse(leftOrder),
            LibOrderData.parse(rightOrder)
        );
    }

    function __TransferManager_init(
        INftTransferProxy _transferProxy,
        IERC20TransferProxy _erc20TransferProxy,
        uint256 newProtocolFee,
        address newCommunityWallet,
        IRoyaltiesProvider newRoyaltiesProvider
    ) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __TransferExecutor_init_unchained(_transferProxy, _erc20TransferProxy);
        __SipherTransferManager_init_unchained(
            newProtocolFee,
            newCommunityWallet,
            newRoyaltiesProvider
        );
        __OrderValidator_init_unchained();
    }
}
