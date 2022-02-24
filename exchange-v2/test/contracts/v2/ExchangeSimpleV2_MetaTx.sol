// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "../../../contracts/ExchangeCore.sol";
import "./SimpleTransferManager.sol";
import "@sipher/meta-tx/contracts/EIP712MetaTransaction.sol";

contract ExchangeSimple_MetaTx is
    ExchangeCore,
    SimpleTransferManager,
    EIP712MetaTransaction
{
    function __ExchangeSimpleV2_init(
        INftTransferProxy _transferProxy,
        IERC20TransferProxy _erc20TransferProxy
    ) external initializer {
        __Context_init_unchained();
        __Ownable_init_unchained();
        __TransferExecutor_init_unchained(_transferProxy, _erc20TransferProxy);
        __OrderValidator_init_unchained();
        __MetaTransaction_init_unchained("ExchangeV2", "1");
    }

    function _msgSender()
        internal
        view
        virtual
        override(ContextUpgradeable, EIP712MetaTransaction)
        returns (address payable)
    {
        return super._msgSender();
    }
}
