// SPDX-License-Identifier: MIT

pragma solidity 0.7.6;
pragma abicoder v2;

import "@sipher/meta-tx/contracts/EIP712MetaTransaction.sol";
import "../ERC721SipherMinimal.sol";

contract ERC721SipherMeta is ERC721SipherMinimal, EIP712MetaTransaction {

    event CreateERC721SipherMeta(address owner, string name, string symbol);
    event CreateERC721SipherUserMeta(address owner, string name, string symbol);

    function __ERC721SipherUser_init(string memory _name, string memory _symbol, string memory baseURI, string memory contractURI, address[] memory operators, address transferProxy, address lazyTransferProxy) external override initializer {
        __ERC721Sipher_init_unchained(_name, _symbol, baseURI, contractURI, transferProxy, lazyTransferProxy);

        for(uint i = 0; i < operators.length; i++) {
            setApprovalForAll(operators[i], true);
        }

        __MetaTransaction_init_unchained("ERC721SipherUserMeta", "1");

        isPrivate = true;

        emit CreateERC721SipherUserMeta(_msgSender(), _name, _symbol);
    }

    function __ERC721Sipher_init(string memory _name, string memory _symbol, string memory baseURI, string memory contractURI, address transferProxy, address lazyTransferProxy) external override initializer {
        __ERC721Sipher_init_unchained(_name, _symbol, baseURI, contractURI, transferProxy, lazyTransferProxy);

        __MetaTransaction_init_unchained("ERC721SipherMeta", "1");

        isPrivate = false;

        emit CreateERC721SipherMeta(_msgSender(), _name, _symbol);
    }

    function _msgSender() internal view virtual override(ContextUpgradeable, EIP712MetaTransaction) returns (address payable) {
        return super._msgSender();
    }
}
