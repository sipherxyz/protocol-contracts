// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "./ExchangeCore.sol";
import "./SipherTransferManager.sol";
import "@sipher/meta-tx/contracts/EIP712MetaTransaction.sol";
import "@sipher/royalties/contracts/IRoyaltiesProvider.sol";

contract ExchangeMeta is ExchangeCore, SipherTransferManager, EIP712MetaTransaction {
    function __Exchange_init(
        INftTransferProxy _transferProxy,
        IERC20TransferProxy _erc20TransferProxy,
        uint newProtocolFee,
        address newDefaultFeeReceiver,
        IRoyaltiesProvider newRoyaltiesProvider
    ) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __TransferExecutor_init_unchained(_transferProxy, _erc20TransferProxy);
        __RaribleTransferManager_init_unchained(newProtocolFee, newDefaultFeeReceiver, newRoyaltiesProvider);
        __OrderValidator_init_unchained();
        __MetaTransaction_init_unchained("Exchange", "1");
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, EIP712MetaTransaction) returns (address payable) {
        return super._msgSender();
    }
}
