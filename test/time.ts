import { providers } from "ethers";
import { getProvider } from "./provider";

export async function increase(seconds: number) {
    const provider = await getProvider();
    await (provider as providers.JsonRpcProvider).send(
        "evm_increaseTime",
        [seconds]
    );
    await (provider as providers.JsonRpcProvider).send("evm_mine", []);
}

export async function now(): Promise<number> {
    const provider = await getProvider();
    const res = await (provider as providers.JsonRpcProvider).send(
        "eth_getBlockByNumber",
        ["latest", false]
    );
    return Number(res.timestamp.toString(10));
}