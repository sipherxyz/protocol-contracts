const UpgradeableBeacon = artifacts.require("UpgradeableBeacon.sol");
const BeaconProxy = artifacts.require("BeaconProxy.sol");
const ERC721SipherMinimal = artifacts.require("ERC721SipherMinimal.sol");
const ERC721SipherFactoryC2 = artifacts.require("ERC721SipherFactoryC2.sol");

const truffleAssert = require('truffle-assertions');

const zeroWord = "0x0000000000000000000000000000000000000000000000000000000000000000";
const zeroAddress = "0x0000000000000000000000000000000000000000";

contract("Test factories minimal", accounts => {

	const tokenOwner = accounts[1];
  const salt = 3;

  let factory;
  beforeEach(async () => {
		const impl = await ERC721SipherMinimal.new();
		const beacon = await UpgradeableBeacon.new(impl.address);
		factory = await ERC721SipherFactoryC2.new(beacon.address, zeroAddress, zeroAddress);
	})

	it("should create erc721 private from factory, getAddress works correctly", async () => {
    let proxy;
    const addressBeforeDeploy = await factory.getAddress("name", "RARI", "https://ipfs.sipher.com", "https://ipfs.sipher.com", [], salt)

		const resultCreateToken = await factory.createToken("name", "RARI", "https://ipfs.sipher.com", "https://ipfs.sipher.com", [], salt, {from: tokenOwner});
      truffleAssert.eventEmitted(resultCreateToken, 'Create721SipherUserProxy', (ev) => {
        proxy = ev.proxy;
        return true;
      });
		const token = await ERC721SipherMinimal.at(proxy);
    const minter = tokenOwner;
    let transferTo = accounts[2];

    assert.equal(proxy, addressBeforeDeploy, "correct address got before deploy")

    const tokenId = minter + "b00000000000000000000001";
    const tokenURI = "//uri";
    console.log("Before call _mintAndTransfer");
    const tx = await token.mintAndTransfer([tokenId, tokenURI, creators([minter]), [], [zeroWord]], transferTo, {from: minter});

		console.log("mint through proxy", tx.receipt.gasUsed);
    assert.equal(await token.ownerOf(tokenId), transferTo);
    assert.equal(await token.name(), "name")

    const txTransfer = await token.safeTransferFrom(transferTo, minter, tokenId, { from: transferTo });
    console.log("transfer through proxy", txTransfer.receipt.gasUsed);
	})

  it("should create erc721 public from factory, getAddress works correctly", async () => {
    let proxy;
    const addressBeforeDeploy = await factory.getAddress("name", "RARI", "https://ipfs.sipher.com", "https://ipfs.sipher.com", salt)

		const resultCreateToken = await factory.methods['createToken(string,string,string,string,uint256)']("name", "RARI", "https://ipfs.sipher.com", "https://ipfs.sipher.com", salt, {from: tokenOwner});
      truffleAssert.eventEmitted(resultCreateToken, 'Create721SipherProxy', (ev) => {
        proxy = ev.proxy;
        return true;
      });
		const token = await ERC721SipherMinimal.at(proxy);
    const minter = tokenOwner;
    let transferTo = accounts[2];

    assert.equal(proxy, addressBeforeDeploy, "correct address got before deploy")

    const tokenId = minter + "b00000000000000000000001";
    const tokenURI = "//uri";
    console.log("Before call _mintAndTransfer");
    const tx = await token.mintAndTransfer([tokenId, tokenURI, creators([minter]), [], [zeroWord]], transferTo, {from: minter});

		console.log("mint through proxy", tx.receipt.gasUsed);
    assert.equal(await token.ownerOf(tokenId), transferTo);
    assert.equal(await token.name(), "name")

    const txTransfer = await token.safeTransferFrom(transferTo, minter, tokenId, { from: transferTo });
    console.log("transfer through proxy", txTransfer.receipt.gasUsed);
	})

  function creators(list) {
  	const value = 10000 / list.length
  	return list.map(account => ({ account, value }))
  }

});