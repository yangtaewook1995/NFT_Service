import { expect, use } from "chai";
import { ethers } from "hardhat";
import { Contract, Signer, BigNumber, constants } from "ethers";
import { solidity } from "ethereum-waffle";
const web3 = require("web3");
import { beforeEach } from "mocha";
import { fromAscii } from "ethjs-util";

use(solidity);

describe("NFT", () => {
    let accounts: Signer[];
    let token: Contract;

    let owner: Signer;
    let user: Signer;

    beforeEach(async () => {
        accounts = await ethers.getSigners();
        owner = accounts[0];
        user = accounts[1];

        const TokenFactory = await ethers.getContractFactory("NFT");
        token = await TokenFactory.deploy();
        await token.connect(owner);
    });

    describe("createToken()", () => {
        it("test", async () => {
            await token
                .connect(owner)
                .createToken(
                    owner.getAddress(),
                    BigNumber.from("1"),
                    "https://ipfs.io/ipfs/QmXth4b16SP5x2F2aSXRiZfCXzLMm9AdDDRPqq9jRcgeXB?filename=wilson.json"
                );

            expect(await token.balanceOf(owner.getAddress())).to.equal(
                BigNumber.from("1")
            );
            expect(await token.ownerOf(BigNumber.from("1"))).to.equal(
                Object.values(owner)[1]
            );
            console.log(await token.tokenURI(BigNumber.from("1")));
        });
    });
});
