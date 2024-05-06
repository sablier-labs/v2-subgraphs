export let chainId = 324;
export let chain = "zksync-era";
export let startBlock = 32472500;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x2fca69fa0a318efdf4c15ee8f13a873347a8a8d4", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xe6c7324bea8474209103e407779eec600c07cf3f", "LD2", "V21"],
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
