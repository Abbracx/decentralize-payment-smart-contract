const UJToken = artifacts.require("UJToken");

const { assert } = require('chai');
const chai = require('chai');
const BN = web3.utils.BN;
const chaiBN = require('chai-bn')(BN); 
chai.use(chaiBN)

const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised)

const expect = chai.expect;


contract ("Token Test", async(accounts) => {
    describe.only("Initial State", () => {

        it("Should have 'name' and 'symbol' specified at the constructor and ...", async() => {
            const name = 'UJToken';
            const symbol = 'UJT';
            const admin = accounts[0];
            const token = await UJToken.new(name, symbol, {from: admin});
            expect(token.name).to.equal(name);
            expect(token.symbol).to.equal(symbol);
        });
        
        it("Should have ZERO supply, not be paused, and set ZERO balances for all ...", async() => {});
        it("Should list all tokens in my account if having an initial supply", async () => {
          //get the token instance deployed on the blockchain
          let instance = await UJToken.deployed();
          let totalSupply = await instance.totalSupply();
          let adminAmount = await instance.balanceOf(accounts[0]);
          // let balance = await instance.balanceOf(address[0]);
          // assert.equal(balance.valueOf, totalSupply.valueOf / 2, "The balance was not same ");
          
        //   expect(adminAmount).to.be.a.bignumber.equal(BN(1e18));
        //   expect(
        //     instance.balanceOf(accounts[0])
        //   ).to.eventually.be.a.bignumber.equal(BN(totalSupply.toString()).sub(1e22));
        });
    });

    describe("Minting", () => {

        it("Can mint tokens increasing the owners balance and total supply as much", async() => {});
        it("Can mint token only by minters(accounts granted minter role).", async() =>{}); 
        it("Should fire 'Transfer' event after minting.", async() => {});
    });

    describe("Transfer", () => {

        it("Can transfer decreasing sender's balance and increasing recipient's balance as much.", async() => {});
        it("Should not change balances of irrelative accounts(neither sender nor recipient).", async() => {});
        it("Should not change total supply at all after transfers.", async() => {});
    });

    describe("Approval", () => { });

    describe("Delegated Transfer", () => {});

    describe("Burning", () => {});

    describe("Circuit Breaker", () => {});
});    