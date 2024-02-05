export let chainId = 42161;
export let chain = "arbitrum-one";
export let startBlock = 161026550;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let factory = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let factory: string[][] = [
  ["0x237400ef5a41886a75b0e036228221df075b3b80", "MSF2", "V21"],
];

export const merkleLLV21: string[][] = [
  ["0x4aF02F2e43042079dFD07F94AfBC3928273aD99f", "ManualDynamicContract", "V21"],
  ["0xF4A49B3C104854a45a022c411B76a623F4A13cFd", "ManualDynamicContract", "V21"],
];

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = { factory: factory[0][0], merkleLLV21: merkleLLV21[0][0] };
