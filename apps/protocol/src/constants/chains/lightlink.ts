export let chainId = 1890;
export let chain = "mainnet";
export let startBlock = 63524900;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x17c4f98c40e69a6A0D5c42B11E3733f076A99E20", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0x49d753422ff05daa291A9efa383E4f57daEAd889", "LD2", "V21"],
];

export let tranched: string[][] = [];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
