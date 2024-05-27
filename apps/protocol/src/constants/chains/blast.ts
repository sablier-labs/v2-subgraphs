export let chainId = 81457;
export let chain = "blast-mainnet";
export let startBlock = 243800;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xcb099efc90e88690e287259410b9ae63e1658cc6", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xdf578c2c70a86945999c65961417057363530a1c", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
