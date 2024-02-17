export let chainId = 168587773;
export let chain = "blast-testnet";
export let startBlock = 1631900;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x3f530bb78f27910bb42b3907bf8a12dc30eb351c", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xc4cfe91fc326741bcd582f804c15fde2eb226475", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
