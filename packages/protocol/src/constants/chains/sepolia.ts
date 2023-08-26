export let chainId = 11155111;
export let chain = "sepolia";
export let startBlock = 4067889;

/** Rule: keep addresses lowercased" */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xd4300c5bC0B9e27c73eBAbDc747ba990B1B570Db", "LL"],
];

export let dynamic: string[][] = [
  ["0x421e1E7a53FF360f70A2D02037Ee394FA474e035", "LD"],
];

/** PRBProxy registry */
export let registry = "0x584009E9eDe26e212182c9745F5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
