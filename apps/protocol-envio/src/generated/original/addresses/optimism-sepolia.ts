export let chainId = 11155420;
export let chain = "optimism-sepolia";
export let startBlock_protocol = 7451810;
export let startBlock_merkle = 7452580;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xe59D28bEF2D37E99b93E734ed1dDcFc4B9C1bf73", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xf9e4095C1dfC058B34135C5c48cae66a8D2b3Aa5", "LD2", "V21"],
];

export let tranched: string[][] = [];

export let factory: string[][] = [
  ["0x9b6cC73522f22Ad3f2F8187e892A51b95f1A0E8a", "MSF2", "V21"],
];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 [Protocol] On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer_protocol = linear[0][0];
export let initializer_merkle = factory[0][0];
