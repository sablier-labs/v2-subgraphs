export let chainId = 56;
export let chain = "bsc";
export let startBlock = 29646270;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x3fe4333f62a75c2a85c8211c6aefd1b9bfde6e51", "LL", "V20"],
  ["0x9721f0bded9196ad2e19efe8b915a013d67a49c0", "LL2", "V21"],
];

export let dynamic: string[][] = [
  ["0xf2f3fef2454dca59eca929d2d8cd2a8669cc6214", "LD", "V20"],
  ["0x4b4319f0251f0d1773ca167b9f707d144465a500", "LD2", "V21"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 * ↪ 🚨 On any new chain, please create a Lockup Linear stream to kick-off the indexing flow
 */

export let initializer = linear[0][0];
