export let chainId = 137;
export let chain = "matic";
export let startBlock = 44637120;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0x67422c3e36a908d5c3237e9cffeb40bde7060f6e", "LL"],
];

export let dynamic: string[][] = [
  ["0x7313addb53f96a4f710d3b91645c62b434190725", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
