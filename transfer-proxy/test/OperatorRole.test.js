const truffleAssert = require("truffle-assertions");
const OperatorRoleTest = artifacts.require("OperatorRoleTest.sol");
const ZERO = "0x0000000000000000000000000000000000000000";
const tests = require("@daonomic/tests-common");
const expectThrow = tests.expectThrow;

contract("OperatorRole", (accounts) => {
  let testing;

  beforeEach(async () => {
    testing = await OperatorRoleTest.new();
    await testing.__OperatorRoleTest_init();
  });

  it("only operator can call protected functions", async () => {
    await expectThrow(testing.getSomething({ from: accounts[1] }));

    await testing.addOperator(accounts[1]);
    assert.equal(await testing.getSomething({ from: accounts[1] }), 10);

    await expectThrow(testing.getSomething({ from: accounts[0] }));
  });

  it("only owner can add/remove operators", async () => {
    await truffleAssert.reverts(testing.addOperator(accounts[2], { from: accounts[1] }));
    await truffleAssert.reverts(testing.removeOperator(accounts[2], { from: accounts[1] }));

    await testing.addOperator(accounts[2], { from: accounts[0] });
    await testing.removeOperator(accounts[2], { from: accounts[0] });
  });
});
