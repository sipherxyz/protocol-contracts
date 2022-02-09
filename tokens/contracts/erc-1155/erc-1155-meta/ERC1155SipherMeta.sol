// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "@sipher/meta-tx/contracts/EIP712MetaTransaction.sol";
import "../ERC1155Sipher.sol";

contract ERC1155SipherMeta is ERC1155Sipher, EIP712MetaTransaction {

    event CreateERC1155SipherMeta(address owner, string name, string symbol);
    event CreateERC1155SipherUserMeta(address owner, string name, string symbol);

    function __ERC1155SipherUser_init(string memory _name, string memory _symbol, string memory baseURI, string memory contractURI, address[] memory operators, address transferProxy, address lazyTransferProxy) external override initializer {
        __ERC1155Sipher_init_unchained(_name, _symbol, baseURI, contractURI, transferProxy, lazyTransferProxy);

        for(uint i = 0; i < operators.length; i++) {
            setApprovalForAll(operators[i], true);
        }
        __MetaTransaction_init_unchained("ERC1155SipherUserMeta", "1");
        
        isPrivate = true;

        emit CreateERC1155SipherUserMeta(_msgSender(), _name, _symbol);
    }
    
    function __ERC1155Sipher_init(string memory _name, string memory _symbol, string memory baseURI, string memory contractURI, address transferProxy, address lazyTransferProxy) external override initializer {
        __ERC1155Sipher_init_unchained(_name, _symbol, baseURI, contractURI, transferProxy, lazyTransferProxy);

        __MetaTransaction_init_unchained("ERC1155SipherMeta", "1");

        isPrivate = false;

        emit CreateERC1155SipherMeta(_msgSender(), _name, _symbol);
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, EIP712MetaTransaction) returns (address payable) {
        return super._msgSender();
    }
}
