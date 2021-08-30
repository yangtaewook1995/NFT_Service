
import "@nomiclabs/hardhat-ethers";
import { providers, Signer } from "ethers";

const hre = require("hardhat");

export async function getProvider() : Promise<providers.Provider> {
    const ethers = hre.ethers;
    const signers = await ethers.getSigners();
    const signer : Signer = signers[0];
    return signer.provider!;
}