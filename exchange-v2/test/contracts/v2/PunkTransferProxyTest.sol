// SPDX-License-Identifier: MIT

pragma solidity >=0.6.9 <0.8.0;
pragma abicoder v2;

import "@sipher/exchange-interfaces/contracts/ITransferProxy.sol";
import "@sipher/exchange-interfaces/contracts/ICryptoPunksMarket.sol";
import "./OperatorRoleTest.sol";

contract PunkTransferProxyTest is OperatorRoleTest, ITransferProxy {
    function transfer(
        LibAsset.Asset memory asset,
        address from,
        address to
    ) external override {
        (address token, uint256 punkIndex) = abi.decode(
            asset.assetType.data,
            (address, uint256)
        );
        ICryptoPunksMarket punkToken = ICryptoPunksMarket(token);
        //check punk from real owner
        require(
            punkToken.punkIndexToAddress(punkIndex) == from,
            "Seller not punk owner"
        );
        //buy punk to proxy, now proxy is owner
        punkToken.buyPunk(punkIndex);
        //Transfer ownership of a punk to buyer
        punkToken.transferPunk(to, punkIndex);
    }
}
